import * as assert from 'assert';
import { initializeStoreWithProductStateController } from "../api/constants";
import { titleIndex, valueIndex } from '../api/constants.indexes';

describe('EntityStateController has initial state split into data and indexes', () => {
    it('the initial data state is empty object', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const propertyState = store.getState()[controller.propertyTitle];
        assert.deepEqual(propertyState, {});
    });
    
    it('initial index state is empty object', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const propertyState = store.getState()[titleIndex.indexKey];
        assert.deepEqual(propertyState, {});
    });

    it('initial index state is empty object', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const propertyState = store.getState()[valueIndex.indexKey];
        assert.deepEqual(propertyState, {});
    });    
});
