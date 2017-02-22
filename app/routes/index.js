import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const {
  Route,
  inject: { service }
} = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  gameService: service(),
  model() {

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
      console.log('not implemented');
    }
  }
});
