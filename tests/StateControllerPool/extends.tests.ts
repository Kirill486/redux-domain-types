import * as assert from 'assert';
import { initializeControllerPool } from '../api/constants.pool';
import { StatePropertyNames } from '../api/constants';

describe('ControllerPool extends redux API', () => {

    it('has makeReducer method that returns an object with key and reducer props', () => {

        const controllerPool = initializeControllerPool();
        const reducerProperty = controllerPool.makeReducer() as any;

        const reducerKey = Object.keys(reducerProperty);
        assert.equal(reducerKey.length, 1);

        assert.equal(reducerKey[0], StatePropertyNames.appMain);

        const reducer = reducerProperty[reducerKey[0]];
        assert.equal(typeof reducer, "function");
    });
});
