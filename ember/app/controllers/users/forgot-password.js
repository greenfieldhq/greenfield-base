import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  actions: {
    forgotPassword: function() {
      var _this = this;
      this.runValidations().then(function() {
        var router = _this.get('target');
        var data = _this.getProperties('email');
        var user = _this.get('model');

        /* jshint unused:false */
        Ember.$.post('api/users/forgot_password', { user: data }, function(results) {
          router.transitionTo('login');
        }).fail(function(jqxhr, textStatus, error ) {
          if (jqxhr.status === 422) {
            var errs = JSON.parse(jqxhr.responseText);
            _this.set('errors.email', errs.errors.email);
          }
        });
      }).catch(function() {
        // validation failed
        return;
      });
    }
  },
  validations: {
    email: {
      presence: {'if': 'canValidate'}
    }
  }
});

