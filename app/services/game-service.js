import Ember from 'ember';
import animalId from 'npm:animal-id';
import { GameState } from '../models/game';

const {
  inject: { service },
  Service,
  RSVP: { reject }
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
    let userGame = store.createRecord('userGame', { user, game });

    game.get('players').pushObject(player);

    return player.save().then(() => {
      return game.save().then(() => {
        userGame.save();
        return game;
      });
    });
  },

  joinGame(game, user) {
    user = user || this.get('session.currentUser');
    if (game.hasUser(user)) {
      return reject();
    }

    let store = this.get('store');
    let players = game.get('players');
    let newPlayer = store.createRecord('player', { user });
    players.pushObject(newPlayer);

    let userGame = store.createRecord('userGame', { user, game });

    return newPlayer.save().then(() => {
      userGame.save();
      return game.save();
    });
  },

  generateUniqueName() {
   return animalId.getId(); //@todo make sure this is unique
  }
});
