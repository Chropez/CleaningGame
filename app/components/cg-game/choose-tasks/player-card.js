import Ember from 'ember';

const {
  Component,
  computed,
  computed: {
    mapBy,
    sum
  }
} = Ember;

export default Component.extend({
  classNames: 'player-card',
  playerTasks: computed('tasks.@each.assigneeId', 'tasks.@each.id', 'player.id', function() {
    return this.get('tasks').filterBy('assignee.id', this.get('player.id'));
  }),
  playerTasksEstimate: mapBy('playerTasks', 'averageEstimate'),
  total: sum('playerTasksEstimate'),
  isActive: computed('player.id', 'playerTurn.id', function() {
    return this.get('player.id') === this.get('playerTurn.id');
  })
});
