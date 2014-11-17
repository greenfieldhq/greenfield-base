import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationFailed: function(response) {
      // response comes from the rejecetd promise in app/initializers/custom-authenticator.js
      // when `authenticate` method fails
      this.controllerFor('login').set('loginErrorMessage', response.errors[0]);
    }
  }
});
