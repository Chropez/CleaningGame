import Ember from 'ember';

const {
  Controller,
  computed
} = Ember;

export default Controller.extend({
  gameComponent: computed('model.state', function() {
    let state = this.get('model.state');
    return `cg-game/${state}`;
  })
});
