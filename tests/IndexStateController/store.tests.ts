import * as assert from 'assert';
import { initializeStoreWithIndexStateController, initializeStoreWithIndexStateControllerAndData } from "../api/constants.index";
import { RedBlackTree, defaultCompare } from 'functional-red-black-tree2';
import { entities } from '../../api_describtion/indexStateController';

describe('IndexStateController can store index data', () => {

    it('has initial state', () => {
        const {store, controller} = initializeStoreWithIndexStateController();
        const innerTree = store.getState()[controller.propertyTitle];
        const stateTree =  new RedBlackTree<entities>(defaultCompare, innerTree);

        const stateKeys = stateTree.keys;
        const values = stateTree.values;

        assert.ok(stateKeys.length === 0);
        assert.ok(values.length === 0 );
    });

    it('can add single id to index', () => {
        const {store, controller} = initializeStoreWithIndexStateController();

        const hash1 = 255;
        const id1 = '42';

        controller.add(hash1, [id1]);

        const innerTree = store.getState()[controller.propertyTitle];
        const stateTree =  new RedBlackTree<entities>(defaultCompare, innerTree);

        const stateKeys = stateTree.keys;
        const values = stateTree.values;

        assert.ok(stateKeys.length === 1);
        assert.ok(stateKeys[0] === hash1);

        assert.ok(values.length === 1);
        assert.ok(values[0].length === 1);
        assert.ok(values[0][0] === id1);
    });

    it('can add multiple id to the same index', () => {
        const {store, controller} = initializeStoreWithIndexStateController();
        
        const hash1 = 255;

        const id1 = '42';
        const id2 = '48';
        
        controller.add(hash1, [id1, id2]);
        const innerTree = store.getState()[controller.propertyTitle];
        const stateTree =  new RedBlackTree<entities>(defaultCompare, innerTree);

        const stateKeys = stateTree.keys;
        const values = stateTree.values;

        assert.ok(stateKeys.length === 1);
        assert.ok(stateKeys[0] === hash1);

        const hashValues = values[hash1];

        assert.ok(hashValues.includes(id1));
        assert.ok(hashValues.includes(id2));
    });

    it('can add multiple ids to different indexes, keys stored in defaultCompare order', () => {
        const {store, controller} = initializeStoreWithIndexStateController();
        
        const hash1 = 255;
        const hash2 = 45;

        const ids1: entities = ['4f2', '48g'];
        const ids2: entities = ['sdfgsdba', 'fhafhadba'];
        
        controller.add(hash1, ids1);
        controller.add(hash2, ids2);

        const innerTree = store.getState()[controller.propertyTitle];
        const stateTree =  new RedBlackTree<entities>(defaultCompare, innerTree);

        const {keys: stateKeys, values} = stateTree.keys;

        assert.ok(stateKeys.length === 2);

        // Order hash1 > hash2
        // hash2 - comes first
        assert.ok(stateKeys[0] === hash2);
        assert.ok(stateKeys[1] === hash1);

        assert.ok(values.length === 2);

        // becouse of order
        const valuesHash1: entities = values[hash1];
        const valuesHash2: entities = values[hash2];

        const valuesHash1IncludeIds = ids1.every((item) => {
            valuesHash1.includes(item);
        });
        assert.ok(valuesHash1IncludeIds);

        const valuesHash2IncludeIds = ids2.every((item) => {
            valuesHash2.includes(item);
        });
        assert.ok(valuesHash2IncludeIds);
    });

    it('can delete id from index', () => {
        const {store, controller, indexes} = initializeStoreWithIndexStateControllerAndData();
        const innerTreeBefore = store.getState()[controller.propertyTitle];
        const stateTreeBefore =  new RedBlackTree<entities>(defaultCompare, innerTreeBefore);

        const anyIndex = 2;
        const anyIndexHash = indexes[anyIndex].hash;

        const entitiesToRemove: entities = [indexes[anyIndexHash].entities[0], indexes[anyIndexHash].entities[1]];

        // Has value under key
        const initialCorrespondingValues = stateTreeBefore.get(anyIndexHash);
        assert.ok(!!initialCorrespondingValues);

        const containEntitiesToRemove =
            entitiesToRemove.every((item) => initialCorrespondingValues.includes(item));
        assert.ok(containEntitiesToRemove);        

        controller.remove(anyIndexHash, entitiesToRemove);

        const innerTreeAfter = store.getState()[controller.propertyTitle];
        const stateTreeAfter =  new RedBlackTree<entities>(defaultCompare, innerTreeAfter);

        const entitiesAfter = stateTreeAfter.get(anyIndexHash);
        const entitiesRemoved = entitiesToRemove.every((item) => {
            return !entitiesAfter.includes(item);
        })
        assert.ok(entitiesRemoved);
    });

    it('can delete all ids from index, key should be deleted as well', () => {
        const {store, controller, indexes} = initializeStoreWithIndexStateControllerAndData();
        const anyIndex = 2;
        const {hash: anyHash, entities: anyEntities} = indexes[anyIndex]
        
        const innerTreeBefore = store.getState()[controller.propertyTitle];
        const stateTreeBefore =  new RedBlackTree<entities>(defaultCompare, innerTreeBefore);
        
        const correspondingEntities = stateTreeBefore.get(anyHash);
        const theSameLength = correspondingEntities.length === anyEntities.length;
        assert.ok(theSameLength);

        const theSameEntities = correspondingEntities.every((item) => anyEntities.includes(item));
        assert.ok(theSameEntities);

        controller.remove(anyHash, anyEntities);

        const innerTreeAfter = store.getState()[controller.propertyTitle];
        const stateTreeAfter =  new RedBlackTree<entities>(defaultCompare, innerTreeAfter);

        const shouldBeEmptyKey = stateTreeAfter.get(anyHash);
        assert.ok(typeof shouldBeEmptyKey === "undefined");
    });

    it('will throw on deleting by hash that not exist', () => {
        const {store, controller} = initializeStoreWithIndexStateController();
        const madeUpHash = 455;
        const madeUpIds: entities = ['madeUpId', 'madeUpId2'];

        try {
            controller.remove(madeUpHash, madeUpIds);
            assert.ok(false);
        } catch(e) {
            assert.ok(e);
            const {message} = e as Error;
            assert.ok(message);

            const hashMentioned = message.includes(`${madeUpHash}`);
            assert.ok(hashMentioned);
        }
    });

    it('will throw on deleting id that does not exist in hash', () => {
        const {store, controller, indexes} = initializeStoreWithIndexStateControllerAndData();
        
        const anyIndex = 3;
        const {hash, entities} = indexes[anyIndex];

        const presentEntityIndex = 0;
        const presentEntityId = entities[presentEntityIndex];

        const innerTreeBefore = store.getState()[controller.propertyTitle];
        const stateTreeBefore =  new RedBlackTree<entities>(defaultCompare, innerTreeBefore);

        const madeUpId = 'someMadeUpId';        
        const entitiesBefore = stateTreeBefore.get(hash);

        const entitiesBeforeDoesNotIncludeMadeUpId = !entitiesBefore.includes(madeUpId);
        assert.ok(entitiesBeforeDoesNotIncludeMadeUpId);

        const entitiesToRemove = [presentEntityId, madeUpId];

        try {
            controller.remove(hash, entitiesToRemove);
        } catch(e) {
            assert.ok(e);
            const {message} = e as Error;
            assert.ok(message);

            const hashMentioned = message.includes(`${hash}`);
            assert.ok(hashMentioned);

            const missingIdMentioned = message.includes(`${madeUpId}`);
            assert.ok(missingIdMentioned);

            const presentIdNotMentioned = !message.includes(`${presentEntityId}`);
            assert.ok(presentIdNotMentioned);

            const innerTreeAfter = store.getState()[controller.propertyTitle];
            const stateTreeAfter =  new RedBlackTree<entities>(defaultCompare, innerTreeAfter);
            const entitiesAfter = stateTreeAfter.get(hash);
            const presentIdMotDeleted = entitiesAfter.includes(presentEntityId);
            assert.ok(presentIdMotDeleted);
        }
    });
});
