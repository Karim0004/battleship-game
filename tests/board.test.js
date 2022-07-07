/* eslint-disable no-undef */
import GameBoard from '../src/GameBoard';

const myboard = GameBoard();

it('place ship in legal bounds', () => {
  expect(myboard.place(1, 2, 3)).toBe(true);
});

it('place ship in illegal bounds', () => {
  expect(myboard.place(3, 10, 10)).toBe(false);
});

it('hit placed ship', () => {
  expect(myboard.attack(2, 4)).toBe(true);
});

it('hit empty cell', () => {
  expect(myboard.attack(9, 9)).toBe(false);
});

it('out of bounds', () => {
  expect(() => { myboard.attack(12, 5); }).toThrow('Out of bounds attack');
});
