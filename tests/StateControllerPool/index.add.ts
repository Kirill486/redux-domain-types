import * as assert from 'assert';
import { initializeStoreWithControllerPool } from "../api/constants.pool";
import { StatePropertyNames } from "../api/constants";
import { ReduxEntityStateController } from "../../src";
import { IProduct, IPosition } from "../../domain_types/domainTypes";
import { dummieProds } from "../api/constants.entity";
import { PositionIndexKeys } from "../api/constants.indexes";
import { IEntity } from '../../utils/definitions';
import { RedBlackTree, defaultCompare } from 'functional-red-black-tree2';
import { getStringHash } from '../../utils/getStringHash';

describe('ControllerPool index ADD', () => {
    it('when you add a position, dependent index is add', () => {
        const {controller, store} = initializeStoreWithControllerPool();

        const productController: ReduxEntityStateController<IProduct> = controller.getControllerFor(StatePropertyNames.product);
        dummieProds.forEach(productController.add);

        const positionController: ReduxEntityStateController<IPosition> = controller.getControllerFor(StatePropertyNames.product);
        const dummiePositionProd = dummieProds[0];
        const dummiePosition: IEntity<IPosition> = {
            id: '9998',
            product: dummiePositionProd.id,
            amount: 10,
        };

        positionController.add(dummiePosition);
        const state = store.getState();

        const poolState = state[controller.getControllerProperty()];
        const positionState = poolState[positionController.propertyTitle];

        const positionDependentIndex = positionState[positionController.dependencyIndexProperyTitle];
        assert.ok(positionDependentIndex);

        const dummieProdDependentPositions = positionDependentIndex[dummiePositionProd.id];

        assert.ok(dummieProdDependentPositions);
        assert.ok(dummieProdDependentPositions.includes(dummiePosition.id));
    });

    it('when you add a position, simple hash index is add', () => {
        const {controller, store} = initializeStoreWithControllerPool();

        const productController: ReduxEntityStateController<IProduct> = controller.getControllerFor(StatePropertyNames.product);
        dummieProds.forEach(productController.add);

        const positionController: ReduxEntityStateController<IPosition> = controller.getControllerFor(StatePropertyNames.product);
        const dummiePositionProd = dummieProds[0];
        const dummiePosition: IEntity<IPosition> = {
            id: '9998',
            product: dummiePositionProd.id,
            amount: 10,
        };

        positionController.add(dummiePosition);
        const state = store.getState();
        const poolState = state[controller.getControllerProperty()];
        const positionState = poolState[positionController.propertyTitle];

        // This is simple index => it does not need the whole state to get calculated
        const productIndex = positionState[positionController.getHashIndexProperyTitle(PositionIndexKeys.product)];
        assert.ok(productIndex);
        const productIndexSearchTree = new RedBlackTree(defaultCompare, productIndex);
        assert.ok(productIndexSearchTree.length === 1);

        // Keys includes hash - number
        // Values includes hash - string
        const prodIdHash = getStringHash(dummiePositionProd.id);
        assert.ok(productIndexSearchTree.keys.includes(prodIdHash))
        assert.ok(productIndexSearchTree.values.includes(dummiePosition.id))
    });

    it('when you add a position, complex hash index is add', () => {
        const {controller, store} = initializeStoreWithControllerPool();

        const productController: ReduxEntityStateController<IProduct> = controller.getControllerFor(StatePropertyNames.product);
        dummieProds.forEach(productController.add);

        const positionController: ReduxEntityStateController<IPosition> = controller.getControllerFor(StatePropertyNames.product);
        const dummiePositionProd = dummieProds[0];
        const dummiePosition: IEntity<IPosition> = {
            id: '9998',
            product: dummiePositionProd.id,
            amount: 10,
        };

        positionController.add(dummiePosition);
        const state = store.getState();
        const poolState = state[controller.getControllerProperty()];
        const positionState = poolState[positionController.propertyTitle];

        // This is complex index => it does need a connection to pool
        const costIndexState = positionState[positionController.getHashIndexProperyTitle(PositionIndexKeys.cost)];
        assert.ok(costIndexState);
        const productIndexSearchTree = new RedBlackTree(defaultCompare, costIndexState);
        assert.ok(productIndexSearchTree.length === 1);

        // Keys includes hash - number
        // Values includes hash - string
        const costHash = dummiePositionProd.value * dummiePosition.amount;
        assert.ok(productIndexSearchTree.keys.includes(costHash));
        assert.ok(productIndexSearchTree.values.includes(dummiePosition.id));
    });
});
