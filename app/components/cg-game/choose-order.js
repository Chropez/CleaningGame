import Ember from 'ember';
import { GameState } from 'cleaning-game/models/game';

const {
  Component,
  computed: {
    sort
  }
} = Ember;

export default Component.extend({
  classNames: 'cg-game-choose-order',
  sortOrder: ['order'],
  players: sort('game.players', 'sortOrder'),
  swapPlayerOrder(order1, order2) {
    let players = this.get('game.players');
    let p1 = players.filterBy('order', order1).get('firstObject');
    let p2 = players.filterBy('order', order2).get('firstObject');

    p1.set('order', order2);
    p1.save();
    p2.set('order', order1);
    p2.save();
  },
  actions: {
    next() {
      let game = this.get('game');
      game.set('state', GameState.ChoosingTasks);
      game.save();
    },

    moveOrderUp(player) {
      let order = player.get('order');
      if (order >= this.get('players.length')) {
        return;
      }

      this.swapPlayerOrder(order, order + 1);
    },

    moveOrderDown(player) {
      let order = player.get('order');
      if (order < 2) {
        return;
      }

      this.swapPlayerOrder(order, order - 1);
    }
  }
});
