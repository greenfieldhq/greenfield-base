import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.ObjectController.extend(EmberValidations.Mixin, {
  actions: {
    resetPassword: function() {
      var _this = this;
      this.runValidations().then(function() {
        var router = _this.get('target');
        var data = _this.getProperties('password', 'password_confirmation');

        data['token'] = _this.get('content').get('token');

        /* jshint unused:false */
        Ember.$.post('api/users/reset_password', { user: data }, function(results) {
          router.transitionTo('login');
        }).fail(function(jqxhr, textStatus, error ) {
          if (jqxhr.status === 422) {
            var errs = JSON.parse(jqxhr.responseText);
            _this.set('errors.password', errs.errors);
          }
        });
      }).catch(function() {
        // validation failed
        return;
      });
    }
  },
  validations: {
    password: {
      presence: {'if': 'canValidate'},
      confirmation: {'if': 'canValidate', message: 'does not match password'}
    },
  }
});


