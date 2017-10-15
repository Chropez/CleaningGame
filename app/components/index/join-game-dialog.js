import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  actions: {
    joinGame(game) {
      if (game === undefined) {
        return;
      }

      this.get('store').findRecord('game', game.toLowerCase()).then((gameRecord) => {
        gameRecord.get('players').then(() => {
          this.get('onJoinGame')(gameRecord);
        });
      }).catch(() => {
        this.set('showGameNotFoundError', true);
      });
    }
  }
});
