import Ember from 'ember';

const {
  Controller,
  computed
} = Ember;

export default Controller.extend({
  gameComponent: computed('model.game.state', function() {
    let state = this.get('model.game.state');
    return `cg-game/${state}`;
  })
});
