import Ember from 'ember';
import animalId from 'npm:animal-id';
import GameState from '../models/game';

const {
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  session: service(),
  store: service(),

  createNewGame() {
    let store = this.get('store');

    let user = this.get('session.currentUser');
    let id = this.generateUniqueName();

    let player = store.createRecord('player', { user });
    let game = store.createRecord('game', { id, state: GameState.New });

    game.get('players').pushObject(player);

    return player.save().then(() => {
      return game.save();
    });
  },

 generateUniqueName() {
   return animalId.getId(); //@todo make sure this is unique
 }
});
