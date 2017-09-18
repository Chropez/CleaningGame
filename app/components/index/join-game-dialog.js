import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  actions: {
    joinGame(game) {
      this.get('store').findRecord('game', game).then((gameRecord) => {
        gameRecord.get('players').then(() => {
          this.get('onJoinGame')(gameRecord);
        });
      }).catch(() => {
        this.set('showGameNotFoundError', true);
      });
    }
  }
});
