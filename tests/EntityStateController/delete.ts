import * as assert from 'assert';
import { initializeStoreWithProductStateControllerAndData } from '../api/constants.entity';


describe('EntityStateController deletes stores data', () => {
    it('can delete by id', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();

        const propertyDataBefore: object = store.getState()[controller.propertyTitle][controller.dataProperyTitle];
        const beforeKeysLength = Object.keys(propertyDataBefore).length;
        assert.ok(beforeKeysLength === prods.length);

        assert.ok(prods[0].id);
        controller.delete(prods[0].id);

        const propertyDataAfter: object = store.getState()[controller.propertyTitle][controller.dataProperyTitle];
        const afterKeysLength = Object.keys(propertyDataAfter).length;
        assert.ok(afterKeysLength === (prods.length - 1));
    });
    it('can delete array of ids', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();

        const propertyDataBefore: object = store.getState()[controller.propertyTitle][controller.dataProperyTitle];
        const beforeKeysLength = Object.keys(propertyDataBefore).length;
        assert.ok(beforeKeysLength === prods.length);

        assert.ok(prods[0].id);
        assert.ok(prods[1].id);

        const prodIds = [prods[0].id, prods[1].id]

        controller.delete(prodIds);

        const propertyDataAfter: object = store.getState()[controller.propertyTitle][controller.dataProperyTitle];
        const afterKeysLength = Object.keys(propertyDataAfter).length;
        assert.ok(afterKeysLength === prods.length - 2);
    });
    it('will throw on wrong id', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const madeUpId = 'someMadeUpId';
        try {
            controller.delete(madeUpId);
            assert.ok(false)
        } catch(e) {
            assert.ok(e);
            const {message} = e as Error;
            assert.ok(message);
            const exactIdMentioned = message.includes(madeUpId);
            assert.ok(exactIdMentioned);
        }
    });
    it('will throw on wrong ids', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const realId = prods[0].id;

        const madeUpIds = ['someMadeUpId111', 'someMadeUpId222'];
        const requestIds = [realId, ...madeUpIds];

        try {
            controller.delete(requestIds);
            assert.ok(false)
        } catch(e) {
            assert.ok(e);
            const {message} = e as Error;
            assert.ok(message);
            const allWrongIdsMentioned = madeUpIds.every((item) => message.includes(item));
            assert.ok(allWrongIdsMentioned);

            const validToDeleteIdsNotMentioned = !message.includes(realId);
            assert.ok(validToDeleteIdsNotMentioned);
        }
    });

});