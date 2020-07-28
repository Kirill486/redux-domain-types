import { IndexStateController, IndexInnerTreeType } from "../../src/IndexStateController/IndexStateController";
import { ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { combineReducers, createStore } from "redux";
import { IndexDto } from "../../api_describtion/indexStateController";
import { printState } from "../../utils/printState";

export const initializeIndexStateController = () => {
    const indexStateController = new IndexStateController('index');
    return indexStateController;    
}

export const initializeStoreWithIndexStateController = () => {
    const IndexStateController = initializeIndexStateController();
    const reducerMap: ReducerMappedToProperty<IndexInnerTreeType> = IndexStateController.makeReducer();
    const combinedReducer = combineReducers({...reducerMap});
    const store = createStore(combinedReducer);

    printState(store);
    store.subscribe(() => printState(store));

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
            entities: ['11121', 'aqscaC', 'wdcdkjnwsbco'],
        },
        {
            hash: 7,
            entities: ['1121', 'ASDVASQVQ', 'QDVQWVWV'],
        },
        {
            hash: 51,
            entities: ['1152', 'asdg', 'ASCAV'],
        },
        {
            hash: 590,
            entities: ['131', 'sclokqh', 'qscl;kch'],
        },
        {
            hash: 52000,
            entities: ['123331', 'dcwc', 'wedl;wkn', 'efclwhj'],
        },
    ];

    indexes.forEach(({hash, entities}) => controller.add(hash, entities));
    return {store, controller, indexes};
}
