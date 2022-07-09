import Player from '../src/Player';

const player = Player(0, true);

it('play a turn', () => {
  player.turn().then((result) => expect(result).toBe({ x: 2, y: 3 }));
});
