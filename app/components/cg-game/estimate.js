import Ember from 'ember';
import { GameState } from 'cleaning-game/models/game';

const {
  Component,
  computed,
  computed: {
    alias,
    filter
  },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: 'cg-game-estimate',
  session: service(),

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

  disableNext: computed('game.players.@each.isDoneEstimating', function() {
    let playersNotDone = this.get('game.players').filterBy('isDoneEstimating', false);
    return playersNotDone.get('length') !== 0;
  }),

  actions: {
    next() {
      let game = this.get('game');
      game.set('state', GameState.ChoosingOrder);
      game.save();
    },

    doneEstimating() {
      let currentPlayer = this.get('currentPlayer');
      currentPlayer.set('isDoneEstimating', true);
      currentPlayer.save();
    },

    backToEstimating() {
      let currentPlayer = this.get('currentPlayer');
      currentPlayer.set('isDoneEstimating', false);
      currentPlayer.save();
    }
  }
});
