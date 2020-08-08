import * as assert from 'assert';
import { initializePoolWithControllersAndData } from '../api/constants.pool';

describe('ControllerPool modify dependent indexes', () => {

    it('when you delete entity - the dependent index is modified', () => {
        const {controller, dummiePositionProd, dummiePosition, store} = initializePoolWithControllersAndData();
    });

    it('when you modify entity - the dependent index is modified', () => {
        const {controller, dummiePositionProd, dummiePosition, store} = initializePoolWithControllersAndData();
    });

    it('when you delete last entity that depends on sertainEntity - the record associated with sertainEntity.id is deleted', () => {
        const {controller, dummiePositionProd, dummiePosition, store} = initializePoolWithControllersAndData();
    });
});
