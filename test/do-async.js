const main = require('..'),
  assert = require('assert');

describe('doAsync tests ', () => {
  it('should fail if input parameter is not valid (number in input)', () => {
    let invalidInput = [
      'A',
      [ 2, 3 ],
      'D'
    ]; 

    const doAsync = () => main.doAsync(invalidInput);

    assert.throws(doAsync, Error);
  });

  it('should fail if input parameter is not valid (undefined in input)', () => {
    let invalidInput = [
      'C',
      [ 'A', 'B' ],
      undefined
    ]; 

    const doAsync = () => main.doAsync(invalidInput);

    assert.throws(doAsync, Error);
  });

  it('should pass if input parameter valid', () => {
    let validInput = [
      'C',
      [ 'A', 'B' ],
      'D'
    ]; 

    const doAsync = () => main.doAsync(validInput);

    assert.doesNotThrow(doAsync, Error);
  });
});