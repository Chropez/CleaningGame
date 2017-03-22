import { GameStateOrder } from 'cleaning-game/models/game';

const RoutedGameStateOrder = GameStateOrder.map((gameState) => {
  return `cg-game/${gameState}`;
});

export default function() {
  this.transition(
    this.fromRoute('index'),
    this.toRoute('game'),
    this.use('exitLeft'),
    this.reverse('exitRight')
  );

  this.transition(
    // this.hasClass('game-component__transition-container'),
    this.toValue((toValue, fromValue) => {
      // debugger;
      let to = RoutedGameStateOrder.indexOf(toValue);
      let from = RoutedGameStateOrder.indexOf(fromValue);
      return to > from;
    }),
    this.use('exitLeft'),
    this.reverse('exitRight')
  );
}
