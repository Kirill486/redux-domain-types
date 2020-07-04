import * as assert from 'assert';
import { createStore } from 'redux';
import { StatePropertyNames, initialApp, positionFactory, productFactory } from './constants';
import { ReduxStateController } from '../../src/StateController';
import { ReduxEntityStateController } from '../../src/EntityStateController';
import { ReduxStateControllerPool } from '../../src';
import { titleIndex, valueIndex, costIndex, productIndex, wishListPosition } from './constants.indexes';
import { IAppState, TPartialAppState } from '../../domain_types/domainTypes';

const initialize = () => {
    const appStateController = new ReduxStateController(StatePropertyNames.app, initialApp);

    const productStateController = new ReduxEntityStateController(
        StatePropertyNames.product,
        productFactory,
        [titleIndex, valueIndex]
    );
    const positionStateController = new ReduxEntityStateController(
        StatePropertyNames.position,
        positionFactory,
        [costIndex, productIndex, wishListPosition],
    );

    const ApplicationStateControllerPool = new ReduxStateControllerPool(appStateController, productStateController, positionStateController);
    const reducer = ApplicationStateControllerPool.makeReducer();

    const store = createStore(reducer);

    ApplicationStateControllerPool.plugIn(store);

    return {
        store, 
        ApplicationStateControllerPool,
    };
}

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
        
    });

    it('throws on unknown property', () => {
    
    });
});
