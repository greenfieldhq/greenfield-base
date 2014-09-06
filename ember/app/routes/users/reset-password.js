import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var reset_token = Ember.Object.create();
    reset_token.set('token', params.reset_token);
    return reset_token;
  }
});

