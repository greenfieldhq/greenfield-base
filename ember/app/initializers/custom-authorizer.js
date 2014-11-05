import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

var CustomAuthorizer = Base.extend({
  authorize: function(jqXHR, requestOptions) {
    var userToken = this.get('session.user_token');
    var userEmail = this.get('session.user_email');
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(userToken) && !Ember.isEmpty(userEmail)) {
      var authData = 'user_token="' + userToken + '", user_email="' + userEmail + '"';
      jqXHR.setRequestHeader('Authorization', 'Token ' + authData);
    }
  }
});

export default {
  name:       'authorizer',
  before:     'simple-auth',
  initialize: function(container, application) {
    container.register('authorizer:custom', CustomAuthorizer);
  }
};

