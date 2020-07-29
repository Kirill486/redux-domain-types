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
        const defaultOrder = controller.query();

        const prodIds = prods.map((prod) => prod.id);

        assert.ok(defaultOrder.length === prods.length);

        defaultOrder.forEach((entity, index) => {
            assert.ok(prodIds.includes(entity.id));

            const correspondingProd = prods.find((prod) => prod.id === entity.id);
            assert.deepEqual(entity, correspondingProd);
        })
    });

    it('it query by index', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const orderedByValue = controller.query(valueIndex.indexKey);

        const prodValues = prods.map((prod) => prod.value);
        assert.ok(orderedByValue.length === prods.length);

        orderedByValue.forEach((entity, index, array) => {
            assert.ok(prodValues.includes(entity.value));

            const previos = array[index - 1];

            if (!!previos) {
                const thisIndexValueGreaterOrEqual = entity.value  >= previos.value;
                assert.ok(thisIndexValueGreaterOrEqual);
            }
        })
    });

    it('it query rande by index', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const from = 200;
        const to = 1000;
        const rangeOrderedByValue = controller.query(valueIndex.indexKey, from, to);

        const prodValues = prods.map((prod) => prod.value);
        // assert.ok(rangeOrderedByValue.length === prods.length);

        rangeOrderedByValue.forEach((entity, index, array) => {
            const currentValue = entity.value;
            assert.ok(prodValues.includes(currentValue));

            assert.ok(currentValue >=  from);
            assert.ok(currentValue <=  to);

            const previos = array[index - 1];

            if (!!previos) {
                const thisIndexValueGreaterOrEqual = currentValue  >= previos.value;
                assert.ok(thisIndexValueGreaterOrEqual);
            }
        })
    });
});