import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import Notify from 'ember-notify';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'greenfield', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'greenfield');

Notify.useBootstrap();

Ember.ObjectController.reopen({
  runValidations: function() {
    this.set('canValidate', true);
    this.validate();
    return this.get('isValid');
  }
});

export default App;
