import * as assert from 'assert';
import { initializeAppStateController, initialApp, initializeStoreWithAppStateController, StatePropertyNames } from './constants';
import { IAppState } from '../../domain_types/domainTypes';


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

        assert.deepEqual(state, initialApp);
        assert.notEqual(state, initialApp);
    });
    
});

describe('StateController control the respective redux property', () => {
    it('state property can be set', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const errorsToSet = ['', '', '3'];

        const diff: Partial<IAppState> = {
            errors: errorsToSet,
        };

        controller.set(diff);
        const appState = store.getState();

        const differedProperty: IAppState = appState[StatePropertyNames.app];

        assert.deepEqual(differedProperty.errors, errorsToSet);        
    });

    it('multiple properties can be set', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const errorsToSet = ['2', '3', '3'];
        const newManualOrder = ['2','4','3','1'];

        const diff: Partial<IAppState> = {
            manualOrder: newManualOrder,
            errors: errorsToSet,
        };

        controller.set(diff);

        const appState = store.getState();
        const {errors, manualOrder}: IAppState = appState[StatePropertyNames.app];

        assert.deepEqual(errors, errorsToSet);
        assert.deepEqual(manualOrder, newManualOrder);

    });

    it('BEWARE!!! Objects in your app state are the same instances BEWARE!!!', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const errorsToSet = ['2', '3', '3'];
        const newManualOrder = ['2','4','3','1'];

        const diff: Partial<IAppState> = {
            manualOrder: newManualOrder,
            errors: errorsToSet,
        };

        controller.set(diff);

        const appState = store.getState();
        const {errors, manualOrder}: IAppState = appState[StatePropertyNames.app];

        assert.equal(errors, errorsToSet);
        assert.equal(manualOrder, newManualOrder);
    })

    it('state can be reset to initial state', () => {
        
        const {store, controller} = initializeStoreWithAppStateController();

        const errorsToSet = ['2', '3', '3'];
        const newManualOrder = ['2','4','3','1'];

        const diff: Partial<IAppState> = {
            manualOrder: newManualOrder,
            errors: errorsToSet,
        };

        controller.set(diff);
        controller.reset();

        const appState = store.getState();

        assert.deepEqual(appState, initialApp);
        assert.notEqual(appState, initialApp);
    });
})