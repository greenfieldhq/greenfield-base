import Ember from 'ember';
import App from '../../app';

export default Ember.ObjectController.extend({
  actions: {
    save: function() {
      var doc = this.get('model');
      debugger;
    }
  }
});
