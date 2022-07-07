import Ship from './Ship';

const GameBoard = () => {
  // initializing the board as a 2d array
  const defaultCell = { ship: null, struck: false };
  const board = new Array(10);
  for (let i = 0; i < 10; i += 1) {
    board[i] = new Array(10);
    for (let ii = 0; ii < 10; ii += 1) {
      board[i][ii] = Object.create(defaultCell);
    }
  }

  const ships = [
    Ship(5),
    Ship(4),
    Ship(3),
    Ship(3),
    Ship(2),
  ];

  const checkCoordinates = (x, y) => (((x in board) && (y in board[x])));

  const emptyCell = (x, y) => (board[x][y].ship === null);

  const placableCell = (x, y) => {
    let firstCol = -1;
    let maxCol = 1;
    let firstRow = -1;
    let maxRow = 1;

    // if the cell is at the edge then do not check
    // for cells over the edge (outside the index)
    if (x === 0) firstCol = 0;
    else if (x === 9) maxCol = 0;

    if (y === 0) firstRow = 0;
    else if (y === 9) maxRow = 0;

    for (let col = firstCol; col <= maxCol; col += 1) {
      for (let row = firstRow; row <= maxRow; row += 1) {
        if (!emptyCell(x + col, y + row)) return false;
      }
    }
    return true;
  };

  const place = (shipNumber, x, y, rotated = false) => {
    // checking the ship is a valid index in ships
    // and coordinates are valid
    if (!((shipNumber in ships)
      && checkCoordinates(x, y))) return false;

    // check the cells are valid for the ship to be placed
    for (let i = 0; i < ships[shipNumber].getLength(); i += 1) {
      if (rotated) {
        if (!placableCell(x + i, y)) return false;
      } else if (!placableCell(x, y + i)) return false;
    }

    // place the ship
    for (let part = 0; part < ships[shipNumber].getLength(); part += 1) {
      if (rotated) {
        board[x + part][y].ship = { number: shipNumber, part, sank: false };
      } else {
        board[x][y + part].ship = { number: shipNumber, part, sank: false };
      }
    }
    return true;
  };

  const attack = (x, y) => {
    if (!checkCoordinates(x, y)) throw new Error('Out of bounds attack');
    if (board[x][y].struck === true) return false;
    board[x][y].struck = true;

    // if a ship exists in the cell hit it and return true
    if (board[x][y].ship !== null) {
      const attackedShip = board[x][y].ship;
      ships[attackedShip.number].hit(attackedShip.part);

      // checking if the ship sunk and changing all its parts'
      // sank property to true
      if (ships[attackedShip.number].isSunk()) {
        board.forEach((col) => {
          col.forEach((cell) => {
            if (cell.ship !== null && cell.ship.number === attackedShip.number) {
              cell.ship.sank = true;
            }
          });
        });
      }

      return true;
    }
    return false;
  };

  const getBoard = () => board;

  const allShipsSunk = () => ships.every((ship) => ship.isSunk());

  return {
    place, attack, getBoard, allShipsSunk,
  };
};

export default GameBoard;
