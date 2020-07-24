import * as assert from 'assert';
import { initializeStoreWithProductStateControllerAndData } from "../api/constants";
import { IEntity } from '../../utils/definitions';
import { IProduct } from '../../domain_types/domainTypes';
import { ReduxEntityStateController } from '../../src/EntityStateController/EntityStateController';

describe('EntityStateController updates data', () => {
    it('will update record by id', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const prodToTest = 0;
        const idToModify = prods[prodToTest].id;

        const diff: Partial<IEntity<IProduct>> = {
            id: idToModify,
            title: 'newTitle111',
            value: 99,
        }

        controller.modify(diff);

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const {
            id: updatedId,
            title: updatedTitle,
            description: updatedDescription,
            value: updatedValue,
        }: IEntity<IProduct> = propertyData[idToModify];


        assert.ok(updatedId);
        assert.ok(updatedId === idToModify);

        assert.ok(updatedTitle);
        assert.ok(updatedTitle  === diff.title);

        assert.ok(updatedDescription);
        assert.ok(updatedDescription === prods[prodToTest].description);

        assert.ok(updatedValue);
        assert.ok(updatedValue === diff.value);
    });
    it('will throw on wrong id', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const wrongId = 'someMAdeUpId';

        const diff: Partial<IEntity<IProduct>> = {
            id: wrongId,
            title: 'SomeTitle',
        }

        try {
            controller.modify(diff);
            assert.ok(false)
        } catch(e) {
            assert.ok(e);
            const {message} = e as Error;
            assert.ok(message);
            const wrongIdMentioned = message.includes(wrongId);
            assert.ok(wrongIdMentioned);
        }
    });

    it('will throw on record with no id', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();

        const diff: Partial<IEntity<IProduct>> = {
            title: 'SomeTitle',
        }

        try {
            controller.modify(diff);
            assert.ok(false)
        } catch(e) {
            assert.ok(e);
            const {message} = e as Error;
            assert.ok(message);
        }
    });
});