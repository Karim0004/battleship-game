/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
import Player from './Player';
import GameBoard from './GameBoard';
import DisplayController from './DisplayController';

const Game = () => {
  const players = [Player(0, false), Player(1, true)];
  const boards = [GameBoard(), GameBoard()];
  let isRunning = false;

  async function run() {
    isRunning = true;
    let current = 0;
    while (true) {
      const attackCoords = await players[current].turn();
      boards[current].attack(attackCoords[0], attackCoords[1]);
      DisplayController.updateBoards();

      if (boards[current].allShipsSunk()) {
        DisplayController.showWinner(current);
        isRunning = false;
        break;
      }
      current = (current === 0) ? 1 : 0;
    }
  }

  function start() {
    if (isRunning) return;
    Promise.all(players[0].place(boards[1]), players[1].place(boards[0]))
      .then(() => run());
  }

  return { start };
};

export default Game;
