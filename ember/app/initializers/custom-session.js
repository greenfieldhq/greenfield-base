import Ember from 'ember';
import Session from 'simple-auth/session';

var CustomSession = Session.extend({
  currentUser: function() {
    var userId = this.get('user_id');
    if (!Ember.isEmpty(userId)) {
      return this.container.lookup('store:main').find('user', userId);
    }
  }.property('user_id')
});

export default {
  name: 'customize-session',
  before: 'simple-auth',
  initialize: function(container) {
    container.register('session:custom', CustomSession);
  }
};
