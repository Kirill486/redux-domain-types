import { initializeAppStateController } from "./constants.state";
import { initializeProductEntityStateController, initializePositionEntityStateController, dummieProds } from "./constants.entity";
import { ReduxStateControllerPool, ReduxEntityStateController } from "../../src";
import { StatePropertyNames } from "./constants";
import { createStore, combineReducers } from "redux";
import { IProduct, IPosition } from "../../domain_types/domainTypes";
import { IEntity } from "../../utils/definitions";

export const initializeControllerPool = () => {
    const appStateController = initializeAppStateController();
    const productEntityStateController = initializeProductEntityStateController();
    const positionEntityStateController = initializePositionEntityStateController();

    const ApplicationStateControllerPool = new ReduxStateControllerPool(
        StatePropertyNames.appMain,
        appStateController,
        productEntityStateController,
        positionEntityStateController,
    );

    return ApplicationStateControllerPool;
}

export const initializeStoreWithControllerPool = () => {

    const ApplicationStateControllerPool = initializeControllerPool();
    const reducerMap = ApplicationStateControllerPool.makeReducer();
    const store = createStore(combineReducers({...reducerMap}));

    const {dispatch, getState} = store;
    ApplicationStateControllerPool.plugIn(dispatch, getState);

    return {
        store,
        controller: ApplicationStateControllerPool,
    };
}

export const initializePoolWithControllersAndData = () => {
    const {controller, store} = initializeStoreWithControllerPool();

    const productController = controller.getControllerFor(StatePropertyNames.product) as ReduxEntityStateController<IProduct>;
    dummieProds.forEach(productController.add);
    const positionController = controller.getControllerFor(StatePropertyNames.product) as ReduxEntityStateController<IPosition>;
    const dummiePositionProd = dummieProds[0];
    const dummiePosition: IEntity<IPosition> = {
        id: '9998',
        product: dummiePositionProd.id,
        amount: 10,
    };
    positionController.add(dummiePosition);
    const state = store.getState();
    return {
        controller,
        store,
        dummieProds,
        dummiePositionProd,
        dummiePosition,
        state,
    }
}
