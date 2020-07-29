import * as assert from 'assert';
import { NotImplementedYetException } from '../../src/exceptions';
import { initializeStoreWithProductStateControllerAndData, initializeStoreWithProductStateController, dummieProds, numberOfValueIndexKeys } from '../api/constants.entity';
import { titleIndex, valueIndex } from '../api/constants.indexes';
import { RedBlackTree, defaultCompare } from 'functional-red-black-tree2';
import { entities } from '../../api_describtion/indexStateController';

describe('Simple indexes do not require another entities to get calculated', () => {

    it('has index data', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        // titleIndex, valueIndex
        const valueIndexPropertyTitle = controller.getIndexProperyTitle(valueIndex.indexKey);
        const innerTree = store.getState()[controller.propertyTitle][valueIndexPropertyTitle];

        assert.ok(!!innerTree);

        const indexTree = new RedBlackTree(defaultCompare, innerTree);

        const {keys, values} = indexTree;

        assert.ok(keys.length === numberOfValueIndexKeys);
        assert.ok(values.length === numberOfValueIndexKeys);

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

        const valueIndexPropertyTitle = controller.getIndexProperyTitle(valueIndex.indexKey);
        const anyNumber = 0;
        const anyProd = dummieProds[anyNumber];
        const anyProdValueHash = valueIndex.index(anyProd);

        const innerTreeBefore = store.getState()[controller.propertyTitle][valueIndexPropertyTitle];
        const indexTreeBefore = new RedBlackTree<entities>(defaultCompare, innerTreeBefore);

        const {keys: keysBefore} = indexTreeBefore;
        assert.ok(keysBefore.includes(anyProdValueHash));

        anyProd.value = 100500;
        controller.modify(anyProd);

        const innerTreeAfter = store.getState()[controller.propertyTitle][valueIndexPropertyTitle];
        const indexTreeAfter = new RedBlackTree<entities>(defaultCompare, innerTreeAfter);

        const oldHashValue = indexTreeAfter.get(anyProdValueHash);
        assert.ok(typeof oldHashValue === "undefined");

        const modifiedProdHash = valueIndex.index(anyProd);
        const newHashValue = indexTreeAfter.get(modifiedProdHash);
        assert.ok(newHashValue);
        assert.ok(newHashValue.length === 1);
        assert.ok(newHashValue.includes(anyProd.id));
    });

    it('index data deleted on entity delete', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();

        const valueIndexPropertyTitle = controller.getIndexProperyTitle(valueIndex.indexKey);
        const anyNumber = 0;
        const anyProd = dummieProds[anyNumber];
        const anyProdValueHash = valueIndex.index(anyProd);

        const innerTreeBefore = store.getState()[controller.propertyTitle][valueIndexPropertyTitle];
        const indexTreeBefore = new RedBlackTree<entities>(defaultCompare, innerTreeBefore);

        const {keys: keysBefore} = indexTreeBefore;
        assert.ok(keysBefore.includes(anyProdValueHash));

        controller.delete(anyProd.id);

        const innerTreeAfter = store.getState()[controller.propertyTitle][valueIndexPropertyTitle];
        const indexTreeAfter = new RedBlackTree<entities>(defaultCompare, innerTreeAfter);

        const oldHashValue = indexTreeAfter.get(anyProdValueHash);
        assert.ok(typeof oldHashValue === "undefined");
    });
});
