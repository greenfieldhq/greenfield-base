import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function(transistion) {
    transistion.send('invalidateSession');
  }
});

