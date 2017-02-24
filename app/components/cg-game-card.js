import Ember from 'ember';

const {
  Component,
  computed: {
    gt
  },
  inject: { service }
} = Ember;

export default Component.extend({
  classNames: 'cg-game-card',
  session: service(),
  hasOtherPlayers: gt('game.players', 1),

  actions: {
    // click
  }
});
