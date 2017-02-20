import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

// import Ember from 'ember';
export let GameStatus = {
  Started: "started",
  Ongoing: "ongoing",
  Finished: "finished"
};

export default Model.extend({
  users: hasMany(),
  status: attr('string'),
  name: attr('string')
});
