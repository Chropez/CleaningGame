import Component from '@ember/component';
import { filter, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: 'task-estimate',
  store: service(),
  playerTasks: filter('player.playerTasks', function(playerTask) {
    return playerTask.get('task.id') === this.get('task.id');
  }),
  playerTask: alias('playerTasks.firstObject'),
  estimate: alias('playerTask.estimate'),

  actions: {
    estimate(estimate) {
      let playerTask = this.get('playerTask');
      let player = this.get('player');

      if (playerTask) {
        let oldEstimate = playerTask.get('estimate');
        if (oldEstimate === estimate) {
          player.get('playerTasks').removeObject(playerTask);
          return player.save().then(() => {
            playerTask.destroyRecord();
          });
        } else {
          playerTask.set('estimate', estimate);
          return playerTask.save();
        }
      }

      let task = this.get('task');
      let game = this.get('game');

      playerTask = this.get('store').createRecord('playerTask', { player, task, estimate, game });
      player.get('playerTasks').pushObject(playerTask);

      playerTask.save().then(() => {
        player.save();
      });
    }
  }

});
