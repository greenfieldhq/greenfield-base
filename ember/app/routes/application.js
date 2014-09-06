import Ember from 'ember';
import AuthManager from '../auth_manager';
import App from '../app';

export default Ember.Route.extend({
  init: function() {
    this._super();

    // Define Globals Here
    App.AuthManager = AuthManager.create({store: this.store});
  },

  actions: {
    logout: function() {
      App.AuthManager.reset();
      this.transitionTo('sessions.new');
    }
  }
});
