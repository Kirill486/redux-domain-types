import * as assert from 'assert';
import * as SearchTree from '../../node_modules/search-tree/dist/rbtree';
import { IProduct } from '../../domain_types/domainTypes';
import { IIndex } from '../../utils/definitions';
import { randomInt } from '../../utils/randomInt';
import { ITree } from 'search-tree/libraryDefinitions';
import { Timer } from '../../utils/timer';
import { time } from 'console';
import { roughlyEqual } from '../../utils/roughlyEqual';
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

const timer = new Timer();
const commonComplexityMultiplier = 100000;

const initializeDataset = (complexityMultiplier) => {    
    const prods: IIndex<IProduct>[] = [];
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

const initializeTree = (complexityMultiplier = 100000) => {
    const dataSet = initializeDataset(complexityMultiplier);
    let tree: ITree<IIndex<IProduct>> = SearchTree.createRBTree<IIndex<IProduct>>();
    dataSet.forEach((prod:IIndex<IProduct>) => {
        tree = tree.insert(prod.id, prod) as ITree<IIndex<IProduct>>;
    });
    return tree;
}

timer.start();

const tree1 = initializeTree();
const tree2 = initializeTree(commonComplexityMultiplier * 10);

const initTime = timer.stop();
console.log(`init trees time ${initTime}`);

describe('Tree is fast', () => {
    it('tree is fast to insert but worse then object', async (done) => {
        timer.start();
        const tree = initializeTree();
        const treeInsert = timer.stop();
        
        timer.start();
        const objectToCompare = {};
        const dataSet = initializeDataset(commonComplexityMultiplier);
        dataSet.forEach((item) => {
            objectToCompare[item.id] = item;
        });
        const objectInsert = timer.stop();

        timer.start();
        const arrayToCompare = [];
        dataSet.forEach((item) => {
            arrayToCompare.push(item);
        });
        const arrayInsert = timer.stop();

        console.log(`Insert benchmark tree: ${treeInsert} object: ${objectInsert} array: ${arrayInsert}`);
        assert.ok(treeInsert  > objectInsert);
        done();
    });

    it('tree is fast to search', () => {
        timer.start();
        for (let t = 0; t< commonComplexityMultiplier; t++) {
            const val = tree1.find(randomInt(0, commonComplexityMultiplier));
        }
        const treeSearch = timer.stop();
        console.log(`Tree search: ${treeSearch}`);
    });

    it('tree is fast to search key like', () => {
        timer.start();
        const timeDelation = 10;
        const lightComplexityMultiplier = commonComplexityMultiplier / timeDelation;

        for (let t = 0; t< lightComplexityMultiplier; t++) {
            tree1.lt(randomInt(0, commonComplexityMultiplier));
        }

        const findKeyLess = timer.stop();
        console.log(`Tree conditional search: ${findKeyLess * timeDelation}`);
    });

    it('tree is fast to return sequence', (done: any) => {
        // https://en.wikipedia.org/wiki/AVL_tree#Traversal
        // Our tree returns next and previos element for a constant time.

        const idToStart = randomInt(0, commonComplexityMultiplier / 2);
        const timeDelation = 1000;
        const lightComplexityMultiplier = commonComplexityMultiplier / timeDelation;

        timer.start();


        const iter1 = tree1.lt(idToStart);
        const iter2 = tree2.lt(idToStart);

        const searchTime = timer.stop();

        console.log(`searchTime: ${searchTime}`);

        assert.ok(iter1);
        assert.ok(iter2);

        timer.start();

        // Case1

        for (let t = 0; t < lightComplexityMultiplier / 2; t++) {
            iter1.next();
            const val = iter1.value;
            assert.ok(val);
        }

        const tree1Time = timer.stop();


        // Case2

        timer.start();

        for (let t = 0; t < lightComplexityMultiplier / 2; t++) {
            iter2.next();
            const val = iter1.value;
            assert.ok(val);
        }

        const tree2Time = timer.stop();
        console.log(`Sequence1: ${tree1Time} Sequence2: ${tree2Time}`);

        assert.ok(roughlyEqual(tree1Time, tree2Time));
        done();
    });

    // it('tree ')
});
