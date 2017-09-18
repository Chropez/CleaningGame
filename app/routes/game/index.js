import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { all } from 'rsvp';

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
