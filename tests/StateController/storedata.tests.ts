import * as assert from 'assert';
import { IAppState } from "../../domain_types/domainTypes";
import { initializeStoreWithAppStateController, initialApp } from '../api/constants.state';
import { StatePropertyNames } from '../api/constants';

describe('StateController control the respective redux property', () => {
    it('state property can be set', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const errorsToSet = ['', '', '3'];

        const diff: Partial<IAppState> = {
            errors: errorsToSet,
        };

        controller.set(diff);
        const appState = store.getState();

        const differedProperty: IAppState = appState[StatePropertyNames.app];

        assert.deepEqual(differedProperty.errors, errorsToSet);
    });

    it('multiple properties can be set', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const errorsToSet = ['2', '3', '3'];
        const newManualOrder = ['2','4','3','1'];

        const diff: Partial<IAppState> = {
            manualOrder: newManualOrder,
            errors: errorsToSet,
        };

        controller.set(diff);

        const appState = store.getState();
        const {errors, manualOrder}: IAppState = appState[StatePropertyNames.app];

        assert.deepEqual(errors, errorsToSet);
        assert.deepEqual(manualOrder, newManualOrder);

    });

    it('BEWARE!!! Objects in your app state are the same instances BEWARE!!!', () => {
        const {store, controller} = initializeStoreWithAppStateController();

        const errorsToSet = ['2', '3', '3'];
        const newManualOrder = ['2','4','3','1'];

        const diff: Partial<IAppState> = {
            manualOrder: newManualOrder,
            errors: errorsToSet,
        };

        controller.set(diff);

        const appState = store.getState();
        const {errors, manualOrder}: IAppState = appState[StatePropertyNames.app];

        assert.equal(errors, errorsToSet);
        assert.equal(manualOrder, newManualOrder);
    })

    it('state can be reset to initial state', () => {

        const {store, controller} = initializeStoreWithAppStateController();

        const errorsToSet = ['2', '3', '3'];
        const newManualOrder = ['2','4','3','1'];

        const diff: Partial<IAppState> = {
            manualOrder: newManualOrder,
            errors: errorsToSet,
        };

        controller.set(diff);
        controller.reset();

        const appState = store.getState()[controller.propertyTitle];

        assert.deepEqual(appState, initialApp);
        assert.notEqual(appState, initialApp);
    });
})