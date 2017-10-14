import Component from '@ember/component';
import { action } from 'ember-decorators/object';
import { service } from 'ember-decorators/service';

export default class IndexContainerComponent extends Component {
  @service session;
  @service gameService;
  @service router;
  @service store;

  @action
  async createNewGame() {
    let game = await this.get('gameService').createNewGame();
    this.get('router').transitionTo('game', game);
  }

  @action
  logout() {
    this.get('session').invalidate();
  }

  @action
  changeName(/* newName */) {
    // eslint-disable-next-line no-console
    console.log('not implemented');
  }

  @action
  joinGame(gameRecord) {
    let user = this.get('session.currentUser');
    this.get('gameService').joinGame(gameRecord, user);
    this.get('router').transitionTo('game', gameRecord);
  }

  @action
  async onDelete(game) {
    let id = game.get('id');

    let userGames = await this.get('store').query('userGame', {
      orderBy: 'game',
      equalTo: id
    });

    userGames.forEach((userGame) => {
      userGame.destroyRecord();
    });
  }
}
