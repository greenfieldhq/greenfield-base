import Ember from 'ember';
import App from '../../app';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  actions: {
    createUser: function() {
      if (!this.runValidations()) {
        return;
      }

      var router = this.get('target');
      var data = this.getProperties('email', 'password', 'password_confirmation');
      var user = this.get('model');
      var _self = this;

      /* jshint unused:false */
      Ember.$.post('api/users', { user: data }, function(results) {
        App.AuthManager.authenticate(results.api_key.access_token, results.api_key.user_id, true).then(function() {
          router.transitionTo('index');
        });
      }).fail(function(jqxhr, textStatus, error ) {
        if (jqxhr.status === 422) {
          var errs = JSON.parse(jqxhr.responseText);
          _self.set('errors.email', errs.errors.email);
          _self.set('errors.password', errs.errors.password);
        }
      });
    }
  },
  validations: {
    email: {
      presence: {if: 'canValidate'},
      format: { with: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, allowBlank: false, message: 'must be a valid email address'  }
    },
    password: {
      presence: {if: 'canValidate'},
      confirmation: {confirmationProperty: 'password_confirmation'}
    },
    agree: {
      presence: {if: 'canValidate'},
      inclusion: {
        in: [true], allowBlank: true, message: 'Must confirm'
      }
    }
  }
});
