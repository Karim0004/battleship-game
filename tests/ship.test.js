/* eslint-disable no-undef */
import Ship from '../src/Ship';

const ship = Ship(3);

it('get length', () => {
  expect(ship.getLength()).toBe(3);
});

it('sunk to be false only 1/3 hit', () => {
  ship.hit(0);
  expect(ship.isSunk()).toBe(false);
});

it('sunk to be false only 2/3 hit', () => {
  ship.hit(1);
  expect(ship.isSunk()).toBe(false);
});

it('sunk to be true 3/3 hit', () => {
  ship.hit(2);
  expect(ship.isSunk()).toBe(true);
});
