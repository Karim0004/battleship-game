function Ship(len) {
  if (typeof len !== 'number') throw new Error(`Expected number got ${typeof len}`);

  const length = Math.round(len);
  if (length > 5) throw new Error('Maximum ship length is 5');
  else if (length < 1) throw new Error('Minimum ship length is 1');

  const body = new Array(length).fill(null);

  const getLength = () => length;

  const hit = (position) => {
    if (position >= length || position < 0) return false;
    body[Math.round(position)] = 'hit';
    return true;
  };

  const isSunk = () => body.every((part) => (part === 'hit'));

  return { getLength, hit, isSunk };
}

export default Ship;
