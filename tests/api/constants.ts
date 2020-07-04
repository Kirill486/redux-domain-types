import { IAppState, IProduct, IPosition } from "../../domain_types/domainTypes";
import { Factory } from "../../utils/definitions";

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
