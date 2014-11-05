import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

var CustomAuthorizer = Base.extend({
  authorize: function(jqXHR, requestOptions) {
    var userToken = this.get('session.user_token');
    var userId    = this.get('session.user_id');
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(userToken) && !Ember.isEmpty(userId)) {
      var authData = 'user_token="' + userToken + '", user_id="' + userId + '"';
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

