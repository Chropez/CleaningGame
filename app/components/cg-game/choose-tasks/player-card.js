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
  playerAssignees: mapBy('tasks', 'assignee'),
  playerTasks: computed('playerAssignees.@each.id', 'tasks.@each.id', 'player.id', function() {
    return this.get('tasks').filterBy('assignee.id', this.get('player.id'));
  }),
  playerTasksEstimate: mapBy('playerTasks', 'averageEstimate'),
  total: sum('playerTasksEstimate')
});
