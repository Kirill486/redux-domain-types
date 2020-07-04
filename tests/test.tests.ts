import { obviousFunction } from "../utils/obviosFunction";
import * as assert from 'assert';

describe('Dummie test', () => {
  it('should return 5', () => {
    const result = obviousFunction(2, 3);
    assert.equal(result, 5);
  });  
});
