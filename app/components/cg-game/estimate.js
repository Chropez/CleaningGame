import Ember from 'ember';

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
    }
  }
});
