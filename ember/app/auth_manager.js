import Ember from 'ember';
import ApiKey from './models/api-key';
import App from './app';
import DS from 'ember-data';

export default Ember.Object.extend({
  rememberMe: false,

  // Load the current user if the cookies exist and is valid
  init: function() {
    this._super();
    this.set('access_token', Ember.$.cookie('access_token'));
    this.set('auth_user', Ember.$.cookie('auth_user'));
  },

  // Determine if the user is currently authenticated.
  isAuthenticated: function() {
    return !Ember.isEmpty(this.get('apiKey.accessToken')) && !Ember.isEmpty(this.get('apiKey.user'));
  },
  
  auth: function() {
    return this.authenticate(this.get('access_token'), this.get('auth_user'));
  },

  // Authenticate the user. Once they are authenticated, set the access token to be submitted with all
  // future AJAX requests to the server.
  authenticate: function(accessToken, userId, rememberMe) {
    var self = this;
    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.run(function() {
        Ember.$.ajaxSetup({
          headers: { 'Authorization': 'Bearer ' + accessToken }
        });
        var $this = self;
        $this.get('store').find('user', userId).then(function(user) {
          $this.set('apiKey', ApiKey.create({
            accessToken: accessToken,
            user: user
          }));
          resolve($this.get('apiKey'));
        }, function(reason) {
          // on rejection
          console.error(reason);
          reject(reason);
        });
        // set the rememberMe flag which determines if an authentication cookie is used
        $this.set('rememberMe', rememberMe);
      });
    });
    return promise;
  },

  // Log out the user
  reset: function() {
    Ember.run.sync();
    Ember.run.next(this, function(){
      this.set('apiKey', null);
      Ember.$.ajaxSetup({
        headers: { 'Authorization': 'Bearer none' }
      });
    });
  },

  // Ensure that when the apiKey changes, we store the data in cookies in order for us to load
  // the user when the browser is refreshed.
  apiKeyObserver: function() {
    if (Ember.isEmpty(this.get('apiKey'))) {
      Ember.$.removeCookie('access_token');
      Ember.$.removeCookie('auth_user');
      // Dont remove email cookie, otherwise there would be no sense in stroing it to begin with
      //Ember.$.removeCookie('auth_user_email');
    } else {
      // Set auth cookie if rememberMe is true
      if (this.get('rememberMe')) {
        Ember.$.cookie('access_token', this.get('apiKey.accessToken'), { expires: 60, path: '/'});
        Ember.$.cookie('auth_user', this.get('apiKey.user.id'), { expires: 60, path: '/'});
        Ember.$.cookie('auth_user_email', this.get('apiKey.user.email'), { expires: 60, path: '/'});
      }
    }
  }.observes('apiKey')
});

// Reset the authentication if any ember data request returns a 401 unauthorized error
DS.rejectionHandler = function(reason) {
  if (reason.status === 401) {
    App.AuthManager.reset();
  }
  throw reason;
};
