import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action, computed } from 'ember-decorators/object';
import { GameStateOrder } from 'cleaning-game/models/game';

export default class GameContainer extends Component {
  session = service();
  router = service();
  gameService = service();

  // sent in values game

  @action
  onBack() {
    this.get('router').transitionTo('index');
  }

  @action
  goToPrevStatus(game) {
    let gameState = game.get('state');
    let currStep = GameStateOrder.indexOf(gameState);
    let prevState = GameStateOrder[currStep - 1];
    game.set('state', prevState);
    game.save();
  }

  @action
  joinGame() {
    let user = this.get('session.currentUser');
    this.get('gameService').joinGame(this.get('game'), user);
  }

  @computed('game.players.[]')
  userIsInGame() {
    let currentUser = this.get('session.currentUser');
    return this.get('game').hasUser(currentUser);
  }
}
