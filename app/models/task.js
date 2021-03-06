import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';
import attr from 'ember-data/attr';
import Ember from 'ember';

const { computed: { alias } } = Ember;

export default Model.extend({
  name: attr('string'),

  // needed for filtering
  game: belongsTo(),
  averageEstimate: attr('number'),

  // when a player is assigned to clean a task
  assignee: belongsTo('player'),
  assigneeId: alias('assignee.id')
});
