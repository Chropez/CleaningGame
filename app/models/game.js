import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  players: hasMany(),
  state: attr('string'),
  name: attr('string')
});

/**
 * GameStatuses
 * @type Enum
 *
 * New = New game, player(s) can add tasks. New players may join
 * Ongoing = Includes multiple states. The game has started. New players may not join.
 *  - Estimating = Players individually estimate all tasks
 *  - ChoosingOrder = Players arrange who starts choosing tasks
 *  - Choosing = Players starts choosing items
 *  - Trading = Players can now trade items to make it more even.
 *  - Cleaning = Players start cleaning
 * Finished = Cleaning is done.
 */
export let GameState = {
  New: "new",
  Estimating: "estimating",
  ChoosingOrder: "choosing-order",
  ChoosingTasks: "choosing-tasks",
  Trading: "trading",
  Cleaning: "cleaning",
  Finished: "finished"
};
