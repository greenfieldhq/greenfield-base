import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.route('logout');
  this.route('loading');

  this.resource('users', function() {
    this.route('show', { path: ':user_id' });
    this.route('new');
    this.route('forgot-password');
    this.route('reset-password', { path: '/reset-password/:reset_token' });
  });
});

export default Router;
