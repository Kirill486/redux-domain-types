import { initializeStoreWithRecordStateController, IUserData } from "../api/constants.record";
import { id } from "../../utils/definitions";
import * as assert from "assert";

describe('RecordStateController stores data', () => {

    it('the initial record state is empty object', () => {
        const {store, controller} = initializeStoreWithRecordStateController();
        const propertyState = store.getState()[controller.propertyTitle];

        assert.deepEqual(propertyState, {});
    });

    it('the key numbers will increase if we insert in empty record state', () => {
        const {store, controller} = initializeStoreWithRecordStateController();

        const propertyStateBefore = store.getState()[controller.propertyTitle];
        const emptyRecordsLengthBefore = Object.keys(propertyStateBefore).length;

        assert.equal(emptyRecordsLengthBefore, 0);

        const id123: id = '123';
        const user123: IUserData = {
            firstName: '123',
            lastName: '456',
        }

        controller.set(id123, user123);

        const propertyStateAfter = store.getState()[controller.propertyTitle];
        const recordsLengthAfter = Object.keys(propertyStateBefore).length;

        assert.equal(recordsLengthAfter, 1);
    });

    it('put record in state by key', () => {
        const {store, controller} = initializeStoreWithRecordStateController();

        const id123: id = '123';
        const user123: IUserData = {
            firstName: '123',
            lastName: '456',
        }

        controller.set(id123, user123);

        const appState = store.getState()[controller.propertyTitle];
        const targetRecord = appState[id123];

        assert.notEqual(targetRecord, undefined);
        assert.deepEqual(targetRecord, user123);
    });

    it('changes the existing record', () => {
        const {store, controller} = initializeStoreWithRecordStateController();

        const id123: id = '123';
        const user123: IUserData = {
            firstName: '123',
            lastName: '456',
        }
        controller.set(id123, user123);

        const user123fixed: IUserData = {
            ...user123,
            lastName: '456_F4',
        }

        controller.set(id123, user123fixed);

        const propertyState = store.getState()[controller.propertyTitle];
        const {lastName}: IUserData = propertyState[id123];

        assert.equal(lastName, user123fixed.lastName);
    });

    it('deletes an existing key', () => {
        const {store, controller} = initializeStoreWithRecordStateController();

        const propertyState0 = store.getState()[controller.propertyTitle];
        const length0 = Object.keys(propertyState0).length;
        assert.equal(length0, 0);

        const id123: id = '123';
        const user123: IUserData = {
            firstName: '123',
            lastName: '456',
        }
        controller.set(id123, user123);

        const propertyState1 = store.getState()[controller.propertyTitle];
        const length1 = Object.keys(propertyState1).length;
        assert.equal(length1, 1);

        controller.delete(id123);

        const propertyState2 = store.getState()[controller.propertyTitle];
        const length2 = Object.keys(propertyState2).length;
        assert.equal(length2, 0);

    });
});

describe('RecordStateController throws errors on suspisios activity', () => {

    it('throws if you try to put undefined in it', () => {
        const {store, controller} = initializeStoreWithRecordStateController();
        const someKey = '123';
        let executionContinued = false;
        try {
            controller.set(someKey, undefined);
            executionContinued = true;
        } catch(e) {
            assert.notEqual(e, undefined);

            const {message} = e as Error;
            assert.equal(typeof message, "string");

            const keyMentioned = (message as string).includes(someKey);
            assert.equal(keyMentioned, true);
        }

        // There's no way that line was hit
        assert.notEqual(executionContinued, true);
    });

    it('throws if you try to delete a record that does not exist', () => {
        const {store, controller} = initializeStoreWithRecordStateController();
        const someKey = '123';
        let executionContinued = false;
        try {
            controller.delete(someKey);
            executionContinued = true;
        } catch(e) {
            assert.notEqual(e, undefined);

            const {message} = e as Error;
            assert.equal(typeof message, "string");

            const keyMentioned = (message as string).includes(someKey);
            assert.equal(keyMentioned, true);
        }

        assert.notEqual(executionContinued, true);
    });

});
