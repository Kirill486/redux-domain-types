import * as assert from 'assert';
import { createStore } from 'redux';
import { ReduxEntityStateController } from '../../src';
import { IProduct } from '../../domain_types/domainTypes';
import { PositionIndexKeys, ProductIndexKeys } from '../api/constants.indexes';
import { initializeControllerPool } from '../api/constants.pool';
import { StatePropertyNames } from '../api/constants';

const createStoreWithStateControllerPoolTest = () => {
    const controllerPool = initializeControllerPool();
    const reducerProperty = controllerPool.makeReducer() as any;
    const reducerKey = Object.keys(reducerProperty);

    const reducer = reducerProperty[reducerKey[0]];
    const store = createStore(reducer);
    const state = store.getState();

    return {
        controllerPool,
        store,
        state,
    }
};

describe('ControllerPool has initial state', () => {

    it('can create store with the pool reducer and get initial state', () => {
        const {store, state} = createStoreWithStateControllerPoolTest();
        assert.ok(store);
        assert.ok(state);
    });

    it('initial state has controller properties', () => {
        const {store, state} = createStoreWithStateControllerPoolTest();
        console.log(state);
        assert.ok(state[StatePropertyNames.app]);
        assert.ok(state[StatePropertyNames.position]);
        assert.ok(state[StatePropertyNames.product]);
    });

    it('initial app state has app properties', () => {
        const {state} = createStoreWithStateControllerPoolTest();
        console.log(state);
        assert.ok(state[StatePropertyNames.app]);
        assert.ok(state[StatePropertyNames.position]);
        assert.ok(state[StatePropertyNames.product]);
    });

    it('initial product state has 3 keys: data property, and 2 hash indexes properties', () => {
        const {state, controllerPool} = createStoreWithStateControllerPoolTest();
        console.log(state);

        const initialProduct = state[StatePropertyNames.product];
        const entityProperyKeys = Object.keys(initialProduct);

        assert.ok(entityProperyKeys.length === 3);

        const productController =
        controllerPool.getControllerFor(StatePropertyNames.product) as ReduxEntityStateController<IProduct> ;

        assert.ok(initialProduct[productController.dataProperyTitle]);
        assert.ok(initialProduct[productController.getHashIndexProperyTitle(ProductIndexKeys.title)]);
        assert.ok(initialProduct[productController.getHashIndexProperyTitle(ProductIndexKeys.value)]);
    });

    it('initial position state has 4 keys: data property, dependencyIndex, 2 hash indexes', () => {
        const {state, controllerPool} = createStoreWithStateControllerPoolTest();
        const initialPosition = state[StatePropertyNames.position];
        const entityProperyKeys = Object.keys(initialPosition);

        assert.ok(entityProperyKeys.length === 4);

        const positionController =
        controllerPool.getControllerFor(StatePropertyNames.position) as ReduxEntityStateController<IProduct>;

        assert.ok(initialPosition[positionController.dataProperyTitle]);
        assert.ok(initialPosition[positionController.dependencyIndexProperyTitle]);

        assert.ok(initialPosition[positionController.getHashIndexProperyTitle(PositionIndexKeys.cost)]);
        assert.ok(initialPosition[positionController.getHashIndexProperyTitle(PositionIndexKeys.product)]);
    });
})
