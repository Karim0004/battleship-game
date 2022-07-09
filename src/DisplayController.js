const DisplayController = (() => {
  const boards = document.getElementById('boards');

  const createBoard = () => {
    const board = document.createElement('div');
    board.className = 'board';
    for (let x = 0; x < 10; x += 1) {
      for (let y = 0; y < 10; y += 1) {
        const cell = document.createElement('div');
        cell.setAttribute('data-cell', `${x}${y}`);
        board.appendChild(cell);
      }
    }
    return board;
  };

  const playerBoard = createBoard();
  const enemyBoard = createBoard();
  document.querySelector('.player-board').appendChild(playerBoard);
  document.querySelector('.enemy-board').appendChild(enemyBoard);

  function play() {
    return new Promise((res) => {
      playerBoard.onclick = (e) => {
        const coords = e.target.getAttribute('data-cell');
        if (!coords) return;
        res(coords);
      };
    });
  }

  function place() {
    return new Promise();
  }

  return { play, place };
})();

export default DisplayController;
