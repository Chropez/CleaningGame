import Component from '@ember/component';
import { computed } from '@ember/object';
import { filter, alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: 'cg-game-estimate',
  session: service(),
  store: service(),

  currentPlayerList: filter('game.players', function(player) {
    let userId = this.get('session.currentUser.id');
    return player.get('user.id') === userId;
  }),

  currentPlayer: alias('currentPlayerList.firstObject'),

  disableDoneEstimating: computed('currentPlayer.playerTasks.[]', 'game.tasks.[]', function() {
    let playerTasks = this.get('currentPlayer.playerTasks.length');
    let tasks = this.get('game.tasks.length');
    return playerTasks !== tasks;
  }),

  allPlayersDoneEstimating: computed('game.players.@each.isDoneEstimating', function() {
    let playersNotDone = this.get('game.players').filterBy('isDoneEstimating', false);
    return playersNotDone.get('length') === 0;
  }),

  actions: {
    doneEstimating() {
      let currentPlayer = this.get('currentPlayer');
      currentPlayer.set('isDoneEstimating', true);
      currentPlayer.save();
    },

    backToEstimating() {
      let currentPlayer = this.get('currentPlayer');
      currentPlayer.set('isDoneEstimating', false);
      currentPlayer.save();
    },

    async estimate(playerTask, task, estimate) {
      if (!playerTask) {
        let game = this.get('game');
        let player = this.get('currentPlayer');

        let playerTask = this.get('store').createRecord('playerTask', {
          player,
          task,
          estimate,
          game
        });

        await playerTask.save();
        player.get('playerTasks').pushObject(playerTask);
        await player.save();
      } else {
        playerTask.set('estimate', estimate);
        await playerTask.save();
      }

    },

    async removeEstimate(playerTask) {
      debugger;
      let player = this.get('currentPlayer');
      player.get('playerTasks').removeObject(playerTask);
      await player.save();
      playerTask.destroyRecord();
    }
  }
});
