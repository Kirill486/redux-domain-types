import { ReduxEntityStateController } from "../../src";
import { StatePropertyNames } from "./constants";
import { productFactoryMethod, positionFactoryMethod } from "./constants.factories";
import { titleIndex, valueIndex, costIndex, productIndex, wishListPosition } from "./constants.indexes";
import { ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { combineReducers, createStore } from "redux";
import { getUniqueValueHashNumber } from "../../utils/getUniqueValueHashNumber";

export const initializeProductEntityStateController = () => {
    const productStateController = new ReduxEntityStateController(
        StatePropertyNames.product,
        productFactoryMethod,
        [titleIndex, valueIndex],
    );
    return productStateController;
}

export const initializePositionEntityStateController = () => {
    const positionStateController = new ReduxEntityStateController(
        StatePropertyNames.position,
        positionFactoryMethod,
        [costIndex, productIndex, wishListPosition],
    );
    return positionStateController;
}

export const initializeStoreWithProductStateController = () => {
    const ProductEntityStateController = initializeProductEntityStateController();
    const reducerMap: ReducerMappedToProperty<any> = ProductEntityStateController.makeReducer();
    const combinedReducer = combineReducers({...reducerMap});
    const store = createStore(combinedReducer);

    const {dispatch, getState} = store;
    ProductEntityStateController.plugIn(dispatch, getState);

    return {
        store,
        controller: ProductEntityStateController,
    }
}

export const initializeStoreWithPositionStateController = () => {
    const PositionEntityStateController = initializePositionEntityStateController();
    const reducerMap: ReducerMappedToProperty<any> = PositionEntityStateController.makeReducer();
    const combinedReducer = combineReducers({...reducerMap});
    const store = createStore(combinedReducer);

    const {dispatch, getState} = store;
    PositionEntityStateController.plugIn(dispatch, getState);

    return {
        store,
        controller: PositionEntityStateController,
    }
}

export const initializeStoreWithProductStateControllerAndData = () => {
    const {store, controller} = initializeStoreWithProductStateController();
    controller.add(dummieProds);
    return {store, controller, prods: dummieProds};
}

export const dummieProds = [
    {
        id: '421',
        title: 'prod1421',
        description: 'descr1421',
        value: 86,
    },
    {
        id: '422',
        title: 'prod1',
        description: 'descr1',
        value: 95,
    },
    {
        id: '423',
        title: 'prod1',
        description: 'descr1',
        value: 137,
    },
    {
        id: '424',
        title: 'prod1',
        description: 'descr1',
        value: 83,
    },
    {
        id: '425',
        title: 'prod1',
        description: 'descr1',
        value: 83,
    },
    {
        id: '642',
        title: 'prod1',
        description: 'descr1',
        value: 2200,
    },
    {
        id: '842',
        title: 'prod1',
        description: 'descr1',
        value: 1100,
    },
    {
        id: '942',
        title: 'prod1',
        description: 'descr1',
        value: 5,
    },
    {
        id: '1142',
        title: 'prod1',
        description: 'descr1',
        value: 12,
    },
    {
        id: '4212',
        title: 'prod1',
        description: 'descr1',
        value: 450,
    },
    {
        id: '4214',
        title: 'prod1',
        description: 'descr1',
        value: 200,
    },
    {
        id: '4122',
        title: 'prod1',
        description: 'descr1',
        value: 120,
    },
];

export const numberOfValueIndexKeys = getUniqueValueHashNumber(dummieProds, valueIndex.index);
