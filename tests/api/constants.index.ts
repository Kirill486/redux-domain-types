import { IndexStateController } from "../../src/IndexStateController/IndexStateController";
import { ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { combineReducers, createStore } from "redux";
import { IndexDto } from "../../api_describtion/indexStateController";

export const initializeIndexStateController = () => {
    const indexStateController = new IndexStateController('index');
    return indexStateController;    
}

export const initializeStoreWithIndexStateController = () => {
    const IndexStateController = initializeIndexStateController();
    const reducerMap: ReducerMappedToProperty<any> = IndexStateController.makeReducer();
    const combinedReducer = combineReducers({...reducerMap});
    const store = createStore(combinedReducer);

    const {dispatch, getState} = store;
    IndexStateController.plugIn(dispatch, getState);

    return {
        store,
        controller: IndexStateController,
    }
}

export const initializeStoreWithIndexStateControllerAndData = () => {
    const {store, controller} = initializeStoreWithIndexStateController();
    
    const indexes: IndexDto[] = [
        {
            hash: 5,
            entities: ['11121'],
        },
        {
            hash: 7,
            entities: ['1121'],
        },
        {
            hash: 51,
            entities: ['1152'],
        },
        {
            hash: 590,
            entities: ['131'],
        },
        {
            hash: 52000,
            entities: ['123331'],
        },
    ];

    indexes.forEach(({hash, entities}) => controller.add(hash, entities));
    return {store, controller, indexes};
}
