import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  inject: { service },
  RSVP: { all } ,
  Route
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

  afterModel(userGames) {
    let gamePromises = userGames.map((userGame) => {
      return userGame.get('game').then((game) => {
        return game.get('players').then((players) => {
          return all(players.map((player) => {
            return player.get('user');
          }));
        });
      });
    });
    return all(gamePromises);
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
    },

    onDelete(game) {
      let id = game.get('id');

      let userGames = this.store.query('userGame', {
        orderBy: 'game',
        equalTo: id
      }).then((userGames) => {
        userGames.forEach((userGame) => {
          userGame.destroyRecord();
        });
      });


      //todo remove all dependencies

    }
  }
});
