import DS from 'ember-data';

export default DS.Model.extend({
  email:    DS.attr('string'),
  phone: DS.attr('string'),
  //cars: DS.hasMany('car', {embedded: 'always', async: true}),
  errors: {}
});

