import Ember from 'ember';

const {
  inject: { service },
  Route,
  RSVP: { all }
} = Ember;

export default Route.extend({
  session: service(),

  model(params, transition) {
    let gameId = transition.params['game'].game_id;
    return this.store.findRecord('game', gameId);
  },

  afterModel(model) {
    return all([
      this.store.query('player', {
         orderBy: 'game',
         equalTo: model.get('id')
      }),
      this.store.query('task', {
        orderBy: 'game',
        equalTo: model.get('id')
      }),
      this.store.query('playerTask', {
        orderBy: 'game',
        equalTo: model.get('id')
      })
    ]);
  }
});
