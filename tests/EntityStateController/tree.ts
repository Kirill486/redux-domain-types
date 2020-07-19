import * as assert from 'assert';
import {createRBTree, RedBlackTree} from '../../node_modules/search-tree/rbtreeTree';
import { IProduct } from '../../domain_types/domainTypes';
import { IIndex } from '../../utils/definitions';
import { randomInt } from '../../utils/randomInt';
// Here we have our tree tested.
// It should return pointer to the first element that satisfy query fast
// And then return elements even faster

// Pre:

// Here's my typed tree
/* https://github.com/Kirill486/functional-red-black-tree */
// So how we do that:

// 1. Generate big dataset (10^6 or bigger);
// 2. Create test object on dataset
// 3. Create array on dataset;
// 4. Create a serch tree on hashFunction.

// We measure:

// * creation time
// * search for a single element by id
// * search for a single element by query
// * search for a query

const initializeDataset = () => {
    const complexityMultiplier = 1000000;
    const prods = [];
    for (let t = 0; t < complexityMultiplier; t++) {
        const id = randomInt(0, complexityMultiplier);
        const makeUpProd: IIndex<IProduct> = {
            id,
            description: `description${id}`,
            title: `title_${id}`,
            value: randomInt(100, 100000),
        }
        prods.push(makeUpProd);
    }

    return prods;
}

const initializeTree = () => {
    const dataSet = initializeDataset();
    let tree = createRBTree<IIndex<IProduct>>();
    dataSet.forEach((prod:IIndex<IProduct>) => {
        tree = tree.insert(prod.id, prod) as RedBlackTree<IProduct>;
    });
}

describe('Tree is fast', () => {
    it('tree is fast to insert', () => {
        const objectToCompare = {};
        


    });
    it('tree is fast to search', () => {});
    it('tree is fast to return sequence', () => {});

});
