import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  gameService: service(),
  session: service(),

  model() {
    let userId = this.get('session.currentUser.id');
    return this.store.query('userGame', {
      orderBy: 'user',
      equalTo: userId
    });
  },

  actions: {
    createNewGame(){
      this.get('gameService').createNewGame().then((game) => {
        this.transitionTo('game', game);
      });
    },

    logout() {
      this.get('session').invalidate();
    },

    changeName(/*newName*/) {
      // eslint-disable-next-line no-console
      console.log('not implemented');
    },

    joinGame(game) {
      this.get('store').findRecord('game', game).then((gameRecord) => {
        gameRecord.get('players').then(() => {
          this.get('gameService').joinGame(gameRecord);
          this.transitionTo('game', gameRecord);
        })
      }).catch(() => {
        this.set('showGameNotFoundError', true);
      })
    }
  }
});
