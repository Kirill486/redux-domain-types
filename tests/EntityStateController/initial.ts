import * as assert from 'assert';
import { titleIndex, valueIndex } from '../api/constants.indexes';
import { initializeStoreWithProductStateController } from '../api/constants.entity';

describe('EntityStateController has initial state split into data and indexes', () => {

    it('the initial data state is an empty object', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const propertyState = store.getState()[controller.propertyTitle];
        const dataProperty = propertyState[controller.dataProperyTitle];
        assert.deepEqual(dataProperty, {});
    });

    it('initial index state is null', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const state = store.getState();
        const titleIndexKey = controller.getIndexProperyTitle(titleIndex.indexKey);
        const propertyState = state[titleIndexKey];
        assert.equal(propertyState, null);
    });

    it('initial index state is null', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const state = store.getState();
        const valueIndexKey = controller.getIndexProperyTitle(valueIndex.indexKey);
        const propertyState = state[valueIndexKey];
        assert.equal(propertyState, null);
    });
});
