import Ember from 'ember';
import Notify from 'ember-notify';

export default Ember.ObjectController.extend(Ember.Validations.Mixin, {
  actions: {
    resetPassword: function() {
      // return if validations don't pass
      if (!this.runValidations()) {
        return;
      }

      var router = this.get('target');
      var data = this.getProperties('password', 'password_confirmation');
      var _self = this;

      data['token'] = this.get('content').get('token');

      /* jshint unused:false */
      Ember.$.post('api/users/reset_password', { user: data }, function(results) {
        var notify = Notify.alert(results.message, {
          closeAfter: null // or set to null to disable auto-hiding
        });
        //notify.send('close');
        router.transitionTo('sessions.new');
      }).fail(function(jqxhr, textStatus, error ) {
        if (jqxhr.status === 422) {
          var errs = JSON.parse(jqxhr.responseText);
          _self.set('errors.password', errs.errors);
        }
      });
    }
  },
  validations: {
    password: {
      presence: {if: 'canValidate'},
      confirmation: {confirmationProperty: 'password_confirmation'}
    },
  }
});


