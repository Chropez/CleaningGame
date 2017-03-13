import Ember from 'ember';
import { GameState } from 'cleaning-game/models/game';

const {
  Component,
  computed: {
    mapBy,
    sum
  },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: 'view-estimate-result',
  gameService: service(),

  estimates: mapBy('game.tasks', 'averageEstimate'),
  estimateSum: sum('estimates'),

  actions: {
    next() {
      let game = this.get('game');
      game.set('state', GameState.ChoosingOrder);
      game.save();
    }
  }
});
