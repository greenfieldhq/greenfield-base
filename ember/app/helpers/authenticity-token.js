import Ember from "ember";
 
export default Ember.Handlebars.makeBoundHelper(
    function() {
      return Ember.$('meta[name="csrf-token"]').attr('content');
    }
);
