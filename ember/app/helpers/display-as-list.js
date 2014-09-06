import Ember from "ember";
 
export default Ember.Handlebars.makeBoundHelper(
    function(items) {
      return items.join(', ');
    }
);
