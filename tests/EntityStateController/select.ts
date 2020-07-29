import { initializeStoreWithProductStateControllerAndData } from "../api/constants.entity";
import * as assert from 'assert';
import { valueIndex } from "../api/constants.indexes";

describe('EntityStateController selects data', () => {

    it('it selects by id', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const anyNumber = 1;
        const anyProd = prods[anyNumber]
        const anyId = anyProd.id;
        
        const selectedById = controller.select(anyId);

        assert.deepEqual(selectedById, anyProd);
        assert.notEqual(selectedById, anyProd);
    });

    it('throws on select by id that does not eist', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const idDoesNotExist = 'some_made_up_id';

        try {
            controller.select(idDoesNotExist);
        } catch(e) {
            assert.ok(e);
            const {message} = e as Error;
            assert.ok(message);

            const idIMentioned = message.includes(idDoesNotExist);
            assert.ok(idIMentioned);
        }
    })

    it('it default query by id', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const defaultOrder = controller.query()
    });

    it('it query by index', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const orderedByValue = controller.query(valueIndex.indexKey);
    });

    it('it query rande by index', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const from = 10;
        const to = 50;
        const rangeOrderedByValue = controller.query(valueIndex.indexKey, from, to);
    });
});