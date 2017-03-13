import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cg-game/estimate/task-estimating-status', 'Integration | Component | cg game/estimate/task estimating status', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cg-game/estimate/task-estimating-status}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cg-game/estimate/task-estimating-status}}
      template block text
    {{/cg-game/estimate/task-estimating-status}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
