import { IProduct, IPosition, IAppState, TPartialAppState } from "./domainTypes";
import { EntityFabric, IActionCreator, HashIndex, Selector, Dispatch, Query, command, ClientSelector, IRecord, Factory, id } from "../src/definitions"
import { EntityStateController, TEntityStateControllerProvider } from "./entityStateController";
import { TStateControllerProvider, IStateController } from "./stateController";

export const commonInitialization =
(
    ProductStateControllerProvider: TEntityStateControllerProvider<IProduct>,
    emptyProductFactory: Factory<IProduct>,


    PositionStateControllerProvider: TEntityStateControllerProvider<IPosition>,
    emptyPositionFactory: Factory<IPosition>,

    titleIndex: HashIndex<IProduct, number>,
    valueIndex: HashIndex<IProduct, number>,

    costIndex: HashIndex<IPosition, number>,
    productIndex: HashIndex<IPosition, IProduct>,
    wishListPosition: HashIndex<IPosition, boolean>,
) => {

    const productStateController = new ProductStateControllerProvider('product', emptyProductFactory, [titleIndex, valueIndex]);
    const positionStateController = new PositionStateControllerProvider('position', emptyPositionFactory, [costIndex, productIndex, wishListPosition]);
    
    // Initial
    const defaultQueried = productStateController.query();
    const sortedByTitle = productStateController.query(titleIndex.indexKey);
    const sortedByValue = productStateController.query(valueIndex.indexKey);
}

export const commonPurchaise = (
    ProductStateController: EntityStateController<IProduct>,
    PositionStateController: EntityStateController<IPosition>,

    titleIndex: HashIndex<IProduct, number>,
    valueIndex: HashIndex<IProduct, number>,

    costIndex: HashIndex<IPosition, number>,
    wishListPosition: HashIndex<IPosition, boolean>,
) => {
    const productSelectedById = ProductStateController.select(null, 'someId');
    const productSelectedByValue = ProductStateController.select(valueIndex.indexKey, 42);
    const productSelectedByTitle = ProductStateController.select(titleIndex.indexKey, 'someTitle');

    const queryInRange = ProductStateController.query(valueIndex.indexKey, (indexValue: number) => (indexValue > 10) && (indexValue < 20));

    if (queryInRange.length) {
        // we want first that require our query
        const position1 = PositionStateController.factory(queryInRange[0], 1);
        PositionStateController.add(position1);                
    }

    const position2 = PositionStateController.factory(productSelectedById, 2);
    PositionStateController.add(position2);

    const position3 = PositionStateController.factory(productSelectedByTitle, 2);
    PositionStateController.add(position3);

    PositionStateController.delete(position2.id);

    const positionToModify = PositionStateController.select(null, position3.id);
    
    if (positionToModify) {
        // diff may be better?
        positionToModify.amount = 5;
        PositionStateController.modify(positionToModify);
    }

    // Show by price (we care more about most valuables)
    const chart = PositionStateController.query(costIndex.indexKey);

    // Show wishes that are about to get complete
    const positionsThatFullfillWisshes = PositionStateController.query(wishListPosition.indexKey);
}    

export const appStateScenario =
(
    EntityStateControllerProvider: TStateControllerProvider<IAppState>,
    positionStateController: EntityStateController<IPosition>,
) => {
    const initial: IAppState = {
        modalOpen: false,
        isLoading: false,
        errors: [],
        manualOrder: undefined,
    }
    const appStateController = new EntityStateControllerProvider('app', initial);

    const diff: TPartialAppState = {
        isLoading: true,
    }
    appStateController.set(diff);

    appStateController.reset();
}

export const manualOrderScenario =
(
    appStateController: IStateController<IAppState>,
    positionStateController: EntityStateController<IPosition>,
) => {
    const order: id[] = positionStateController.query().map((position) => position.id);

    {
        const diff: TPartialAppState = {
            manualOrder: order,
        }
        appStateController.set(diff);
    }

    {
        // will throw if you mess with names
        const manualOrder = appStateController.select('manualOrder') as id[];

        // change places first and last
        const newOrder = moveItem(manualOrder, 0, 2);
        const diff: TPartialAppState = {
            manualOrder: order,
        }
        appStateController.set(diff);
    }
}