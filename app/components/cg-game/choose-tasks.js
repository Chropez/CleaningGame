import Ember from 'ember';
// import { GameState } from 'cleaning-game/models/game';

const {
  Component,
  computed,
  computed: {
    equal,
    sort
  },
  inject: { service },
  isEmpty
} = Ember;

export default Component.extend({
  classNames: 'cg-game-choose-tasks',
  session: service(),

  sortOrder: ['order'],
  players: sort('game.players', 'sortOrder'),
  currentPlayer: computed('game.players.@each.user', 'session.currentUser.id', function() {
    let players = this.get('game.players');
    let currentUserId = this.get('session.currentUser.id');
    return players.findBy('user.id', currentUserId);
  }),

  unassignedTasks: computed('game.tasks.@each.assignee', function() {
    let tasks = this.get('game.tasks');
    return tasks.filter((task) => {
      return isEmpty(task.get('assignee.user.id'));
    });
  }),

  allTasksAssigned: equal('unassignedTasks.length', 0),

  orderTurn: computed('game.players.@each.order', 'unassignedTasks.@each.id', function() {
    let game = this.get('game');
    let players = game.get('players.length');
    let totalTasks = game.get('tasks.length');
    let assignedTasks = totalTasks - this.get('unassignedTasks.length');
    return assignedTasks % players + 1;
  }),

  playerTurn: computed('orderTurn', 'allTasksAssigned', function() {
    if (this.get('allTasksAssigned')) {
      return null;
    }
    let orderTurn = this.get('orderTurn');
    return this.get('game.players').findBy('order', orderTurn);
  }),

  isMyTurn: computed('playerTurn', 'playerTurn.id', 'allTasksAssigned', 'currentPlayer.id', function() {
    let allTasksAssigned = this.get('allTasksAssigned');
    return this.get('currentPlayer.id') === this.get('playerTurn.id') && !allTasksAssigned;
  }),

  // onIsMyTurn: observer('isMyTurn', function() {
  //   if (this.get('isMyTurn')) {
  //     window.scrollTo(0, 0);
  //   }
  // }),

  actions: {
    next() {
      // let game = this.get('game');
      // game.set('state', GameState.Estimating);
      // game.save();
    },

    chooseTask(task) {
      let currentPlayer = this.get('currentPlayer');
      task.set('assignee', currentPlayer);
      this.set('showPlayersWhenChoosing', false);
      task.save();
    }
  }
});
