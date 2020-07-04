import * as assert from 'assert';
import { StatePropertyNames, initialApp, initialize } from './constants';
import { ReduxStateController } from '../../src/StateController';
import { IAppState, TPartialAppState } from '../../domain_types/domainTypes';
import { StateControllerUnknownPropertyName } from '../../src/exceptions';

describe('StateController Basic Usage', () => {
  
    it('ensures app initial defined and not null', () => {
        const {store, ApplicationStateControllerPool} = initialize();
        const appStateController: ReduxStateController<IAppState> = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app);

        const storedInState = appStateController.select();

        assert.notEqual(storedInState, undefined);
        assert.notEqual(storedInState, null);
    });

    it('ensures app initial deep equal to initial state', () => {
        const {store, ApplicationStateControllerPool} = initialize();
        const appStateController: ReduxStateController<IAppState> = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app);

        const storedInState = appStateController.select();

        assert.deepEqual(storedInState, initialApp);
    });

    it('app initial is not the same instance as initial', () => {
        const {store, ApplicationStateControllerPool} = initialize();
        const appStateController: ReduxStateController<IAppState> = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app);

        const storedInState = appStateController.select();

        assert.notEqual(storedInState, initialApp);
       
    });

    it('ensures we can set state', () => {
        const {ApplicationStateControllerPool} = initialize();
        const appStateController: ReduxStateController<IAppState> = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app);

        const diff: TPartialAppState = {
            isLoading: true,
        }
        appStateController.set(diff);

        const storedInState: IAppState = appStateController.select();

        assert.equal(storedInState.isLoading, true);
    });

    it('ensures we can set state a few props at a time', () => {
        const {ApplicationStateControllerPool} = initialize();
        const appStateController: ReduxStateController<IAppState> = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app);

        const diff: TPartialAppState = {
            modalOpen: true,
            isLoading: true,
        }
        appStateController.set(diff);

        const storedInState: IAppState = appStateController.select();

        assert.equal(storedInState.isLoading, true);
        assert.equal(storedInState.modalOpen, true);
    });

    it('ensures we can query single property', () => {
        const {ApplicationStateControllerPool} = initialize();
        const appStateController: ReduxStateController<IAppState> = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app);

        const isOpen = appStateController.select('modalOpen');
        assert.equal(isOpen, false);
    });

    it('throws on unknown property', () => {
        const {ApplicationStateControllerPool} = initialize();
        const appStateController: ReduxStateController<IAppState> = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app);

        try {
            const isOpen = appStateController.select('someProperyWeDoNotKnow');
        } catch(e) {
            const error = e as Error;
            const expectedError = StateControllerUnknownPropertyName('someProperyWeDoNotKnow');
            assert.equal(e.message, expectedError.message);
        }        
    });
});
