import { combineReducers } from 'redux';
import { IAppState, IProduct, IPosition } from "../../domain_types/domainTypes";
import { Factory } from "../../utils/definitions";
import { ReduxStateController, ReduxEntityStateController, ReduxStateControllerPool } from "../../src";
import { titleIndex, valueIndex, costIndex, productIndex, wishListPosition } from "./constants.indexes";
import { createStore } from "redux";
import { IEntityFactoryMethod } from "../../src/EntityStateController";

const postfix = 'test_env';

// Avoiding Magic Strings
export const StatePropertyNames = Object.freeze({
    product: `product_${postfix}`,
    position: `position_${postfix}`,
    app: `app_${postfix}`,
});

export const initialApp: IAppState = {
    modalOpen: false,
    isLoading: false,
    errors: [],
    manualOrder: undefined,
}

const productFactory: Factory<IProduct> = (title, description, value) => ({
    title,
    description,
    value,
});

export const productFactoryMethod: IEntityFactoryMethod<IProduct> = {
    factory: productFactory,
    linkedProperties: [],
};

const positionFactory: Factory<IPosition> = (productId, amount = 1) => ({
    product: productId,
    amount: amount,
})

export const positionFactoryMethod: IEntityFactoryMethod<IPosition> = {
    factory: positionFactory,
    linkedProperties: ["product"],
};

export const initializeAppStateController = () => {
    const appStateController = new ReduxStateController(StatePropertyNames.app, initialApp);
    return appStateController;
}

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

export const initializeControllerPool = () => {
    const appStateController = initializeAppStateController();
    const productEntityStateController = initializeProductEntityStateController();
    const positionEntityStateController = initializePositionEntityStateController();

    const ApplicationStateControllerPool = new ReduxStateControllerPool(
        appStateController,
        productEntityStateController,
        positionEntityStateController,
    );

    return ApplicationStateControllerPool;
}

export const  initializeStoreWithAppStateController = () => {
    const ApplicationStateController = initializeAppStateController();    
    const reducerMap = ApplicationStateController.makeReducer();
    const combinedReducer = combineReducers({...reducerMap});
    const store = createStore(combinedReducer);

    ApplicationStateController.plugIn(store);

    return {
        store,
        controller: ApplicationStateController,
    }
}


export const initializeStoreWithControllerPool = () => {
    
    const ApplicationStateControllerPool = initializeControllerPool();    
    const reducer = ApplicationStateControllerPool.makeReducer();
    const store = createStore(reducer);

    ApplicationStateControllerPool.plugIn(store);

    return {
        store, 
        controller: ApplicationStateControllerPool,
    };
}
