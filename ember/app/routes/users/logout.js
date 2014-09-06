import Ember from 'ember';
import App from '../../app';

export default Ember.Route.extend({
  beforeModel: function() {
    App.AuthManager.reset();
    this.transitionTo('sessions.new');
  }
});

