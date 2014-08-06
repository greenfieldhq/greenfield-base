import Ember from 'ember';
import App from '../../app';

export default Ember.ObjectController.extend({
  actions: {
    save: function() {
      var doc = this.store.createRecord('document');
      doc.set('title', this.get('title'));
      doc.set('body', this.get('body'));
      doc.save();
    }
  }
});
