import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('email', Ember.$.cookie('auth_user_email'));
  },
  model: function() {
    return Ember.Object.create();
  }
});
