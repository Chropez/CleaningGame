import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  gameComponent: computed('model.state', function() {
    let state = this.get('model.state');
    return `cg-game/${state}`;
  })
});
