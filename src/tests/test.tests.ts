import { obviousFunction } from "..";
import * as assert from 'assert'

describe('Obvious function', () => {
  it('should return 5', () => {
    const result = obviousFunction(2, 3);
    assert.equal(result, 5);
  });
});