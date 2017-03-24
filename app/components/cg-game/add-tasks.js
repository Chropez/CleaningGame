import Ember from 'ember';
import { GameState } from 'cleaning-game/models/game';

const {
  Component,
  computed: { empty },
  inject: { service },
  isEmpty,
  RSVP: { all }
} = Ember;

export default Component.extend({
  classNames: 'cg-add-tasks',
  session: service(),
  store: service(),
  showNext: empty('game.tasks'),
  actions: {
    addTask() {
      let taskName = this.get('taskName');
      if (isEmpty(taskName)) {
        return;
      }

      let game = this.get('game');
      let task = this.get('store').createRecord('task', { name: taskName, game });
      game.get('tasks').pushObject(task);
      task.save().then(() => {
        game.save();
      });

      this.set('taskName', '');
    },

    next() {
      let game = this.get('game');
      let players = game.get('players');

      let promises = players.map((player) => {
        if (player.get('isDoneEstimating')) {
          player.set('isDoneEstimating', false);
          return player.save();
        }
      });

      promises = promises.filter((pr) => { return pr !== undefined });
      all(promises).then(() => {
        game.set('state', GameState.Estimating);
        game.save();
      });
    },

    remove(task) {
      let game = this.get('game');
      let players = game.get('players');
      let taskId = task.get('id');

      players.forEach((player) => {
        let playerTasks = player.get('playerTasks')
        let playerTask = playerTasks.findBy('task.id', taskId);

        if (!playerTask) return;
        playerTasks.removeObject(playerTask);
        player.save().then(() => {
          playerTask.destroyRecord();
        });
      });

      game.get('tasks').removeObject(task);

      game.save().then(() => {
        task.destroyRecord();
      });
    }
  },

});
