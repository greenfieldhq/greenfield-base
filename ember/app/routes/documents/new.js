import Ember from 'ember';
import AuthenticatedRoute from '../authenticated';

export default AuthenticatedRoute.extend({
  model: function() {
    return Ember.Object.create();
  }
});
