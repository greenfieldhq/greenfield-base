import Ember from 'ember';
import App from '../../app';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  attemptedTransition: null,

  actions: {
    loginUser: function() {
      if (!this.runValidations()) {
        return;
      }

      var self = this;
      var router = this.get('target');
      var data = this.getProperties('email', 'password');
      // For now just always assume 'remember me'. The mockups don't have a checkbox controll so I'm assuming it's the default.
      var rememberMe = true;
      var attemptedTrans = this.get('attemptedTransition');

      Ember.$.post('api/session', data, function(results) {
        App.AuthManager.authenticate(results.api_key.access_token, results.api_key.user_id, rememberMe).then(function() {
          if (attemptedTrans) {
            attemptedTrans.retry();
            self.set('attemptedTransition', null);
          } else {
            router.transitionTo('index');
          }
        });
      }).fail(function(data) {
         self.set('errors.email', data.responseJSON.errors);
      });
    }
  },
  validations: {
    email: {
      presence: {if: 'canValidate'}
    },
    password: {
      presence: {if: 'canValidate'}
    }
  }
});
