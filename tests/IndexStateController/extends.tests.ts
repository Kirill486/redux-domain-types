import * as assert from 'assert';
import { initializeIndexStateController } from '../api/constants.index';

describe('IndexStateController extends redux API', () => {

    it('has makeReducer method that returns an object with key and reducer props', () => {
        const indexStateController = initializeIndexStateController();
        const reducerProperty = indexStateController.makeReducer();

        const reducerKey = Object.keys(reducerProperty);
        assert.equal(reducerKey.length, 1);

        const reducer = reducerProperty[reducerKey[0]];
        assert.equal(typeof reducer, "function");
    });

    // As soon as we get some understanding of the tree we're gonna store
});
