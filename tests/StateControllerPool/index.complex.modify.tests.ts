import * as assert from 'assert';
import { initializeStoreWithControllerPool, initializePoolWithControllersAndData } from '../api/constants.pool';
import { dummieProds } from '../api/constants.entity';
import { ReduxEntityStateController } from '../../src/EntityStateController/EntityStateController';
import { IProduct, IPosition } from '../../domain_types/domainTypes';
import { StatePropertyNames } from '../api/constants';
import { IEntity } from '../../utils/definitions';
import { PositionIndexKeys } from '../api/constants.indexes';
import { RedBlackTree, defaultCompare } from 'functional-red-black-tree2';
import { entities } from '../../api_describtion/indexStateController';

describe('ControllerPool modify complex indexes indexes', () => {
    it('when you modify a position changing product - the cost index recalculates', () => {
        const {controller, dummiePositionProd, dummiePosition, store} = initializePoolWithControllersAndData();
        const positionController: ReduxEntityStateController<IPosition> =
        controller.getControllerFor(StatePropertyNames.position);

        const anotherProd = dummieProds[5];
        assert.ok(dummiePositionProd.value !== anotherProd.value);

        positionController.modify({
            ...dummiePosition,
            product: anotherProd.id,
        });

        const newCost = anotherProd.value * dummiePosition.amount;

        const state = store.getState();
        const poolState = state[controller.getControllerProperty()];
        const positionState = poolState[positionController.propertyTitle];

        const costIndexState = positionState[positionController.getHashIndexProperyTitle(PositionIndexKeys.cost)];
        assert.ok(costIndexState);
        const costIndexSearchTree = new RedBlackTree<entities>(defaultCompare, costIndexState);
        assert.ok(costIndexSearchTree.length === 1);
        costIndexSearchTree.keys.includes(newCost);
        const values = costIndexSearchTree.values[0];
        assert.ok(values.length ===  1);
        assert.ok(values.includes(dummiePosition.id));
    });

    it('when you modify a position changing amount - the cost index recalculates', () => {
        const {controller, dummiePositionProd, dummiePosition, store} = initializePoolWithControllersAndData();
        const positionController: ReduxEntityStateController<IPosition> =
        controller.getControllerFor(StatePropertyNames.position);

        const anotherAmount = 55;
        assert.ok(dummiePosition.amount !== anotherAmount);

        positionController.modify({
            ...dummiePosition,
            amount: anotherAmount,
        });

        const newCost = dummiePositionProd.value * anotherAmount;

        const state = store.getState();
        const poolState = state[controller.getControllerProperty()];
        const positionState = poolState[positionController.propertyTitle];

        const costIndexState = positionState[positionController.getHashIndexProperyTitle(PositionIndexKeys.cost)];
        assert.ok(costIndexState);
        const costIndexSearchTree = new RedBlackTree<entities>(defaultCompare, costIndexState);
        assert.ok(costIndexSearchTree.length === 1);
        costIndexSearchTree.keys.includes(newCost);
        const values = costIndexSearchTree.values[0];
        assert.ok(values.length ===  1);
        assert.ok(values.includes(dummiePosition.id));
    });

    it('when you modify a product changing value - the cost index recalculates', () => {
        const {controller, dummiePositionProd, dummiePosition, store} = initializePoolWithControllersAndData();

        const productController: ReduxEntityStateController<IProduct> =
        controller.getControllerFor(StatePropertyNames.product);

        const positionController: ReduxEntityStateController<IPosition> =
        controller.getControllerFor(StatePropertyNames.product);

        const newProductValue = 100542;
        assert.ok(dummiePositionProd.value !== newProductValue);

        productController.modify({
            ...dummiePositionProd,
            value: newProductValue,
        });

        const newCost = dummiePosition.amount * newProductValue;

        const state = store.getState();
        const poolState = state[controller.getControllerProperty()];
        const positionState = poolState[positionController.propertyTitle];

        const costIndexState = positionState[positionController.getHashIndexProperyTitle(PositionIndexKeys.cost)];
        assert.ok(costIndexState);
        const costIndexSearchTree = new RedBlackTree<entities>(defaultCompare, costIndexState);
        assert.ok(costIndexSearchTree.length === 1);

        costIndexSearchTree.keys.includes(newCost);
        const values = costIndexSearchTree.values[0];
        assert.ok(values.length ===  1);
        assert.ok(values.includes(dummiePosition.id));
    });

    it('when you delete a product - the corresponding positions are deleted by default pointer-resolving strategy', () => {
        const {controller, dummiePositionProd, dummiePosition, store} = initializePoolWithControllersAndData();

        const productController: ReduxEntityStateController<IProduct> =
        controller.getControllerFor(StatePropertyNames.product);

        const positionController: ReduxEntityStateController<IPosition> =
        controller.getControllerFor(StatePropertyNames.product);

        productController.delete(dummiePositionProd.id);

        const state = store.getState();
        const poolState = state[controller.getControllerProperty()];
        const positionState = poolState[positionController.propertyTitle];
        const dataState = positionState[positionController.dataProperyTitle];

        const dataStateKeys = Object.keys(dataState);
        assert.ok(dataStateKeys.length  ===  0);

        const costIndexState = positionState[positionController.getHashIndexProperyTitle(PositionIndexKeys.cost)];
        assert.ok(costIndexState);
        const costIndexSearchTree = new RedBlackTree<entities>(defaultCompare, costIndexState);
        assert.ok(costIndexSearchTree.length === 0);
    });
});
