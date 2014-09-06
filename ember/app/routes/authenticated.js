import Ember from 'ember';
import App from '../app';

export default Ember.Route.extend({
  beforeModel: function(transition) {
    var _self = this;
    if (!App.AuthManager.isAuthenticated()) {
      App.AuthManager.auth().then(function() {
        transition.retry();
      }, function(reason) {
        //transition.abort();
        _self.redirectToLogin(transition); 
      });
    }
  },
  // Redirect to the login page and store the current transition so we can
  // run it again after login
  redirectToLogin: function(transition) {
    var sessionNewController = this.controllerFor('sessions.new');
    sessionNewController.set('attemptedTransition', transition);
    this.transitionTo('sessions.new');
  },

  actions: {
    error: function(reason, transition) {
      this.redirectToLogin(transition);
    },
    loading: function() {
      //alert('loading data...');
    }
  }
});
