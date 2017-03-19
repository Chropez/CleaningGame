import Ember from 'ember';

const {
  Component,
  inject: { service }
} = Ember;

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
