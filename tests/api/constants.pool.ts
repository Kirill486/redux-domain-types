import { initializeAppStateController } from "./constants.state";
import { initializeProductEntityStateController, initializePositionEntityStateController } from "./constants.entity";
import { ReduxStateControllerPool } from "../../src";
import { StatePropertyNames } from "./constants";
import { createStore, combineReducers } from "redux";

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