import Ember from 'ember';
import { GameState } from 'cleaning-game/models/game';

const {
  Component,
  computed: { empty },
  inject: { service },
  isEmpty
} = Ember;

export default Component.extend({
  classNames: 'cg-add-tasks',
  session: service(),
  store: service(),
  showNext: empty('game.tasks'),
  actions: {
    addTask() {
      let taskName = this.get('taskName');
      if (isEmpty(taskName)) {
        return;
      }

      let user = this.get('session.currentUser');
      let game = this.get('game');
      let task = this.get('store').createRecord('task', { name: taskName, user, game });
      game.get('tasks').pushObject(task);
      task.save().then(() => {
        game.save();
      });

      this.set('taskName', '');
    },

    next() {
      let game = this.get('game');
      game.set('state', GameState.Estimating);
      //game.save();
    },

    changeName() {

    },

    remove(task) {
      let game = this.get('game');
      game.get('tasks').removeObject(task);

      game.save().then(() => {
        task.destroyRecord();
      });
    }
  },

});
