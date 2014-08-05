import DS from 'ember-data';

export default DS.Model.extend({
  userId: DS.attr('number'),
  title: DS.attr('string'),
  body: DS.attr('string')
});
