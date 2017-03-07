import Ember from 'ember';

const {
  inject: { service },
  Route,
  RSVP: { hash }
} = Ember;

export default Route.extend({
  session: service(),

  model(params, transition) {
    let gameId = transition.params['game'].game_id;
    return hash({
      game: this.modelFor('game'),
      players: this.store.query('player', {
         orderBy: 'game',
         equalTo: gameId
      })
    });

  }
});
