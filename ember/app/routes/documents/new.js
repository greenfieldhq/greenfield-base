import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    var doc = this.store.createRecord('document');
    doc.set('title', 'Who does');
    doc.set('body', 'Number 2 work for?');
    return doc;
  },
  actions: {
  }
});
