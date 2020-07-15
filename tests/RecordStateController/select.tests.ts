import { initializeStoreWithRecordStateController, IUserData } from "../api/constants.record";
import { id } from "../../utils/definitions";
import * as assert from "assert";

describe('RecordStateController selects data', () => {
    it('selects single record', () => {
        const {store, controller} = initializeStoreWithRecordStateController();
        
        const id123: id = '123';
        const user123: IUserData = {
            firstName: '123',
            lastName: '456',
        }

        controller.set(id123, user123);
        
        const propertyState = store.getState()[controller.propertyTitle];
        const recordFromState = propertyState[id123];
        assert.deepEqual(recordFromState, user123);

        const recordFromSelector = controller.select(id123);

        assert.deepEqual(recordFromState, recordFromSelector);
    });
    
    it('selects a whole state', () => {
        const {store, controller} = initializeStoreWithRecordStateController();
        
        const id123: id = '123';
        const user123: IUserData = {
            firstName: '123',
            lastName: '456',
        }

        controller.set(id123, user123);
        
        const propertyState = store.getState()[controller.propertyTitle];
        assert.deepEqual(propertyState, { [id123]: user123 });

        const propertyStateSelected = controller.select(id123);
        assert.deepEqual(propertyState, propertyStateSelected);
    });
});

describe('RecordStateController thrown on bad select attempts', () => {
    it("id you're trying to reach is not present", () => {
        const {store, controller} = initializeStoreWithRecordStateController();
        let executionContinued = false;
        const madeUpId = 'i_not_present_in_state_definitely'
        try {
            controller.select(madeUpId);
            executionContinued = true;
        } catch(e) {
            assert.notEqual(e, undefined);

            const {message} = e as Error;
            assert.equal(typeof message, "string");

            const keyMentioned = (message as string).includes(madeUpId);
            assert.equal(keyMentioned, true);
        }
    });
});
