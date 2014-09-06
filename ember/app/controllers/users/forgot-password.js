import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  actions: {
    forgotPassword: function() {
      if (!this.runValidations()) {
        return;
      }

      var router = this.get('target');
      var data = this.getProperties('email');
      var user = this.get('model');
      var _self = this;

      /* jshint unused:false */
      Ember.$.post('api/users/forgot_password', { user: data }, function(results) {
        var notify = Notify.alert(results.message, {
          closeAfter: null // or set to null to disable auto-hiding
        });
        //notify.send('close');
        router.transitionTo('sessions.new');
      }).fail(function(jqxhr, textStatus, error ) {
        if (jqxhr.status === 422) {
          var errs = JSON.parse(jqxhr.responseText);
          _self.set('errors.email', errs.errors.email);
        }
      });
    }
  },
  validations: {
    email: {
      presence: {if: 'canValidate'}
    }
  }
});

