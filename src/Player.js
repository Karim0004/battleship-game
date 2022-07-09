/* eslint-disable no-await-in-loop */
import DisplayController from './DisplayController';

const Player = (playerNo, AI = true) => {
  async function computerPlay() {
    return [Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
  }

  async function playerPlay() {
    let coords = await DisplayController.play();
    coords = coords.split('');
    coords[0] = Number(coords[0]);
    coords[1] = Number(coords[1]);
    return coords;
  }

  async function playerPlace(board) {
    while (!board.ready()) {
      const p = await DisplayController.place();
      board.place(p.number, p.x, p.y, p.rotated);
    }
    return true;
  }

  async function computerPlace(board) {
    while (!board.ready()) {
      const p = {
        number: Math.floor(Math.random() * 5),
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
        rotated: (Math.floor(Math.random() * 2) === 0),
      };

      board.place(p.number, p.x, p.y, p.rotated);
    }
    return true;
  }

  const turn = AI ? computerPlay : playerPlay;
  const place = AI ? computerPlace : playerPlace;

  return { turn, place };
};

export default Player;
