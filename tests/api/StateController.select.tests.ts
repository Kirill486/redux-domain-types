import * as assert from 'assert';
import { initializeStoreWithAppStateController, StatePropertyNames, initialApp } from "./constants";
import { IAppState } from "../../domain_types/domainTypes";

describe('StateController select data', () => {
    it('Select the whole state', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const state = controller.select();
        assert.deepEqual(state, initialApp);
    });

    it('Select individual properties', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const someOrder = [];

        controller.set({
            manualOrder: someOrder,
        })

        const manualOrder = controller.select('manualOrder');
        assert.deepEqual(manualOrder, someOrder); 
    });

    it('Select multiple properties properties', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const someOrder = [];
        const someErrors = [];

        controller.set({
            manualOrder: someOrder,
            errors: someErrors,
        })

        const partial = controller.select(['manualOrder', 'errors']);
        assert.deepEqual(partial, {
            manualOrder: someOrder,
            errors: someErrors,
        }); 
    });
});

describe('StateController throws on failed selects', () => {
    it('Throws when you mess up with single property key', () => {
        const {store, controller} = initializeStoreWithAppStateController();
        const missedPropertyName = 'somepropertyDontExist';
        try {
            controller.select(missedPropertyName);
        } catch(e) {
            const errorMessage = e.errorMessage;
            const propertyNameIncluded =
                errorMessage &&
                errorMessage.constants(missedPropertyName);
            assert.equal(propertyNameIncluded, true);
        }
    });

    it('Throws when you mess up with multiple keys property key', () => {
        const {store, controller} = initializeStoreWithAppStateController();
        const missedPropertyKeys = ['somepropertyDontExist', 'another one'];
        const existingKeys = ['manualOrder', 'modalOpen'];
        const requestKeys = [...existingKeys, ...missedPropertyKeys];
        try {
            controller.select(requestKeys);
        } catch(e) {
            const errorMessage = e.errorMessage;
            const propertyNameIncluded =
                errorMessage &&
                errorMessage.constants(missedPropertyKeys);

            assert.equal(propertyNameIncluded, true);
        }
    });
    
});
