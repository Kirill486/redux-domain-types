import * as assert from 'assert';
import { initializeAppStateController, initialApp } from '../api/constants.state';

describe('StateController extends redux API', () => {

    it('has makeReducer method that returns an object with key and reducer props', () => {

        const appStateController = initializeAppStateController();
        const reducerProperty = appStateController.makeReducer();

        const reducerKey = Object.keys(reducerProperty);
        assert.equal(reducerKey.length, 1);

        const reducer = reducerProperty[reducerKey[0]];
        assert.equal(typeof reducer, "function");
    });

    it('reducer can be executed with state and it will return state', () => {
        const appStateController = initializeAppStateController();
        const reducerProperty = appStateController.makeReducer();

        const reducerKey = Object.keys(reducerProperty);
        assert.equal(reducerKey.length, 1);
        const reducer = reducerProperty[reducerKey[0]];

        const state = reducer(initialApp, { type: 'any', payload: null });
        // console.log(initialApp);
        // console.log(state);

        assert.deepEqual(state, initialApp);
    });

    it('reducer returns a new instance', () => {
        const appStateController = initializeAppStateController();
        const reducerProperty = appStateController.makeReducer();

        const reducerKey = Object.keys(reducerProperty);
        assert.equal(reducerKey.length, 1);
        const reducer = reducerProperty[reducerKey[0]];

        const state = reducer(initialApp, { type: 'any', payload: null });

        assert.notEqual(state, initialApp);
    });
});
