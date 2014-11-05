import Ember from 'ember';
import EmberValidations from 'ember-validations';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.ObjectController.extend(LoginControllerMixin, EmberValidations.Mixin, {
  authenticator: 'authenticator:custom',

  identification: function() {
    // the LoginControllerMixin expects an identification property
    return this.get('email');
  }.property('email'),

  actions: {
    createUser: function() {
      var _this = this;
      this.runValidations().then(function() {
        var router = _this.get('target');
        var data = _this.getProperties('email', 'password');
        data['password_confirmation'] = _this.get('passwordConfirmation'); // Ember validations expects camel case, but Rails expects snake case

        /* jshint unused:false */
        Ember.$.post('api/users', { user: data }, function(results) {
          _this.send('authenticate');
        }).fail(function(jqxhr, textStatus, error ) {
          if (jqxhr.status === 422) {
            var errs = JSON.parse(jqxhr.responseText);
            _this.set('errors.email', errs.errors.email);
            _this.set('errors.password', errs.errors.password);
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
      presence: {'if': 'canValidate'},
      format: { 'if': 'canValidate', with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, allowBlank: false, message: 'must be a valid email address'  }
    },
    password: {
      presence: {'if': 'canValidate'},
      confirmation: {'if': 'canValidate', message: 'does not match password'}
    },
  }
});
