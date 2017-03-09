import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

export default Model.extend({
  players: hasMany(),
  state: attr('string'),
  name: attr('string'),
  tasks: hasMany(),

  hasUser(user) {
    //let players = this.get('players');
    let users = this.get('players').map((player) => {
      return player.get('user');
    });

    let userId = user.get('id');
    return users.findBy('id', userId) !== undefined;
  },

  getPlayer(user) {
    return this.get('players').findBy('user.id', user.get('id'));
  }
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
  AddingTasks: "add-tasks",
  Estimating: "estimate",
  ChoosingOrder: "choose-order",
  ChoosingTasks: "choose-tasks",
  Trading: "trade",
  Cleaning: "clean",
  Finished: "finish"
};
