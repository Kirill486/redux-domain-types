import * as assert from 'assert';
import { NotImplementedYetException } from '../../src/exceptions';
import { initializeStoreWithProductStateControllerAndData, initializeStoreWithProductStateController, dummieProds } from '../api/constants.entity';
import { titleIndex, valueIndex } from '../api/constants.indexes';
import { RedBlackTree, defaultCompare } from 'functional-red-black-tree2';

describe('Simple indexes do not require another entities to get calculated', () => {
    it('has index data', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        // titleIndex, valueIndex
        const valueIndexPropertyTitle = controller.getIndexProperyTitle(valueIndex.indexKey);
        const innerTree = store.getState()[controller.propertyTitle][valueIndexPropertyTitle];
        
        assert.ok(!!innerTree);

        const indexTree = new RedBlackTree(defaultCompare, innerTree);

        const {keys, values} = indexTree;
        assert.ok(keys.length === prods.length);
        assert.ok(values.length === prods.length);

        prods.forEach((prod) => {
            assert.ok(keys.includes(prod.value));
        });
    });

    it('index data created on entity creation', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const valueIndexPropertyTitle = controller.getIndexProperyTitle(valueIndex.indexKey);
        const anyNumber = 0;
        const anyProd = dummieProds[anyNumber];

        const innerTreeBefore = store.getState()[controller.propertyTitle][valueIndexPropertyTitle];
        const indexTreeBefore = new RedBlackTree(defaultCompare, innerTreeBefore);

        const {keys: keysBefore} = indexTreeBefore;
        assert.ok(keysBefore.length === 0);

        controller.add(anyProd);

        const innerTreeAfter = store.getState()[controller.propertyTitle][valueIndexPropertyTitle];
        const indexTreeAfter = new RedBlackTree(defaultCompare, innerTreeAfter);

        const {keys: keysAfter, values: valuesAfter} = indexTreeAfter;
        assert.ok(keysAfter.length === 1);
        assert.ok(keysAfter[0] === anyProd.value)
        assert.ok(valuesAfter[0][0] === anyProd.id)
    });

    it('index data updated on entity update', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('index data deleted on entity delete', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('index value can contain a few entities', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('key can be moved between store properties on index recalculation', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('throws on attempt to use complex index without Pool', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

});
