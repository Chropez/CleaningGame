import Component from '@ember/component';
import { filter, alias } from '@ember/object/computed';
// import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: 'task-estimate',

  tasks: filter('playerTasks.@each.task', function(playerTask) {
    return playerTask.get('task.id') === this.get('task.id');
  }),

  estimatedPlayerTask: alias('tasks.firstObject'),
  estimate: alias('estimatedPlayerTask.estimate'),

  actions: {
    estimate(estimate) {
      let playerTask = this.get('estimatedPlayerTask');

      if (playerTask) {
        let oldEstimate = playerTask.get('estimate');
        if (oldEstimate === estimate) {
          this.onRemoveEstimate(playerTask);
          return;
        }
      }

      this.onEstimate(playerTask, this.get('task'), estimate);
    }
  }
});
