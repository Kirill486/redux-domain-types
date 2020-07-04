import { IAppState, IProduct, IPosition } from "../../domain_types/domainTypes";
import { Factory } from "../../utils/definitions";
import { ReduxStateController, ReduxEntityStateController, ReduxStateControllerPool } from "../../src";
import { titleIndex, valueIndex, costIndex, productIndex, wishListPosition } from "./constants.indexes";
import { createStore } from "redux";

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

export const productFactory: Factory<IProduct> = (title, description, value) => ({
    title,
    description,
    value,
});

export const positionFactory: Factory<IPosition> = (productId, amount = 1) => ({
    product: productId,
    amount: amount,
})

export const initialize = () => {
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

    const ApplicationStateControllerPool = new ReduxStateControllerPool(
        appStateController,
        productStateController,
        positionStateController,
    );
    const reducer = ApplicationStateControllerPool.makeReducer();

    const store = createStore(reducer);

    ApplicationStateControllerPool.plugIn(store);

    return {
        store, 
        ApplicationStateControllerPool,
    };
}