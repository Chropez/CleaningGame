import Model from 'ember-data/model';
import { belongsTo, hasMany } from 'ember-data/relationships';
import attr from 'ember-data/attr';

export default Model.extend({
  user: belongsTo(),
  game: belongsTo(),
  order: attr('number'),
  isDoneEstimating: attr('boolean'),
  playerTasks: hasMany('playerTasks')
});
