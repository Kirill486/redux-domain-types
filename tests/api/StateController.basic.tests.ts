import * as assert from 'assert';
import { initializeAppStateController, initialApp } from './constants';


describe('StateController extends redux API', () => {
  
    it('has makeReducer method that returns a function', () => {

        const appStateController = initializeAppStateController();
        const reducer = appStateController.makeReducer();

        assert.equal(typeof reducer, "function");
    });

    it('reducer can be executed with state and it will return state', () => {
        const appStateController = initializeAppStateController();
        const reducer = appStateController.makeReducer();

        const state = reducer(initialApp, { type: 'any', payload: null });

        assert.deepEqual(state, initialApp);
        assert.notEqual(state, initialApp);
    })
});
