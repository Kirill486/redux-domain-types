import * as assert from 'assert';
import { initializeStoreWithProductStateController } from "../api/constants";
import { titleIndex, valueIndex } from '../api/constants.indexes';

describe('EntityStateController has initial state split into data and indexes', () => {

    it('the initial data state is an empty object', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const propertyState = store.getState()[controller.propertyTitle];
        const dataProperty = propertyState[controller.dataProperyTitle];
        assert.deepEqual(dataProperty, {});
    });
    
    it('initial index state is empty object', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const state = store.getState();
        const propertyState = [titleIndex.indexKey];
        assert.deepEqual(propertyState, {});
    });

    it('initial index state is empty object', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const propertyState = store.getState()[valueIndex.indexKey];
        assert.deepEqual(propertyState, {});
    });    
});
