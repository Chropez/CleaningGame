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


    let game = store.createRecord('game', { id, state: GameState.New, name :'new game' });
    let player = store.createRecord('player', { user, game, order: 1 });
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
    let order = players.get('length') + 1;

    let newPlayer = store.createRecord('player', { user, game, order });
    players.pushObject(newPlayer);

    let userGame = store.createRecord('userGame', { user, game });

    return newPlayer.save().then(() => {
      userGame.save();
      return game.save();
    });
  },

  generateUniqueName() {
   return animalId.getId(); //@todo make sure this is unique
  },

  setTaskAverageEstimate(game) {
    let players = game.get('players.length');
    return game.get('tasks').map((task) => {
      let playerTasksEstimate = this.getPlayerTasks(game, task).map((playerTask) => {
        return playerTask.get('estimate');
      }).reduce((a, b) => { return a + b });

      task.set('averageEstimate', playerTasksEstimate / players);
      return task.save();
    });
  },

  getPlayerTasks(game, task) {
    let players = game.get('players');
    let taskId = task.get('id');
    return players.map((player) => {
    return player.get('playerTasks').findBy('task.id', taskId);
    });
  }
});
