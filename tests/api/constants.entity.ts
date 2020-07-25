import { ReduxEntityStateController } from "../../src";
import { StatePropertyNames } from "./constants";
import { productFactoryMethod, positionFactoryMethod } from "./constants.factories";
import { titleIndex, valueIndex, costIndex, productIndex, wishListPosition } from "./constants.indexes";
import { ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { combineReducers, createStore } from "redux";
import { IEntity } from "../../utils/definitions";
import { IProduct } from "../../domain_types/domainTypes";

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
        const newProd1: IEntity<IProduct> = {
            id: '42',
            title: 'prod1',
            description: 'descr1',
            value: 42,
        };
        const newProd2: IEntity<IProduct> = {
            id: '422',
            title: '2prod12',
            description: '2descr12',
            value: 242,
        };
    const prods = [newProd1, newProd2];
    controller.add(prods);
    return {store, controller, prods};
}
