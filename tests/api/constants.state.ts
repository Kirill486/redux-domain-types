import { ReduxStateController } from "../../src";
import { StatePropertyNames } from "./constants";
import { IAppState } from "../../domain_types/domainTypes";
import { combineReducers, createStore } from "redux";

export const initialApp: IAppState = {
    modalOpen: false,
    isLoading: false,
    errors: [],
    manualOrder: undefined,
}

export const initializeAppStateController = () => {
    const appStateController = new ReduxStateController(StatePropertyNames.app, initialApp);
    return appStateController;
}

export const  initializeStoreWithAppStateController = () => {
    const ApplicationStateController = initializeAppStateController();    
    const reducerMap = ApplicationStateController.makeReducer();
    const combinedReducer = combineReducers({...reducerMap});
    const store = createStore(combinedReducer);
    const {dispatch, getState} = store;

    ApplicationStateController.plugIn(dispatch, getState);

    return {
        store,
        controller: ApplicationStateController,
    }
}
