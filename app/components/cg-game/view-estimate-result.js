import Component from '@ember/component';
import { sum, mapBy } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { GameState } from 'cleaning-game/models/game';

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
