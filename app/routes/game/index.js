import Ember from 'ember';

const {
  inject: { service },
  Route,
  RSVP: { all }
} = Ember;

export default Route.extend({
  session: service(),

  model() {
    return this.modelFor('game');
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
