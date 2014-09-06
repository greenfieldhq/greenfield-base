import Ember from 'ember';

var Router = Ember.Router.extend({
  location: GreenfieldENV.locationType
});

Router.map(function() {
  this.route('about');
  this.resource('users', function() {
    this.route('show', { path: ':user_id' });
    this.route('new');
    this.route('forgot_password');
    this.route('reset_password', { path: '/reset_password/:reset_token' });
    this.route('logout');
    this.route('terms');
    this.route('privacy');
  });
  this.resource('sessions', function() {
    this.route('new');
  });
  this.route('top_secret');
  this.route('loading');
  this.resource('documents', function() {
    this.route('show', { path: ':document_id' });
    this.route('new');
  });
});

export default Router;
