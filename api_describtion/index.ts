import { IProduct, IPosition, IAppState, TPartialAppState } from "../domain_types/domainTypes";
import { IEntityStateController, TEntityStateControllerProvider } from "./entityStateController";
import { TStateControllerProvider, IStateController } from "./stateController";
import { Factory, HashIndex, id } from "../utils/definitions";
import {TStateControllerPoolProvider, StateControllerPool, AnyStateController} from "./libraryApi";
import { createStore } from 'redux';
import { StatePropertyNames, initialApp } from "../tests/api/constants";

export const commonInitialization =
(
    StateControllerPoolProvider: TStateControllerPoolProvider,

    StateControllerProvider: TStateControllerProvider<IAppState>,

    ProductStateControllerProvider: TEntityStateControllerProvider<IProduct>,
    emptyProductFactory: Factory<IProduct>,


    PositionStateControllerProvider: TEntityStateControllerProvider<IPosition>,
    emptyPositionFactory: Factory<IPosition>,

    titleIndex: HashIndex<IProduct, number>,
    valueIndex: HashIndex<IProduct, number>,

    costIndex: HashIndex<IPosition, number>,
    productIndex: HashIndex<IPosition, id>,
    wishListPosition: HashIndex<IPosition, boolean>,
) => {

    
    const appStateController = new StateControllerProvider(StatePropertyNames.app, initialApp);

    const productStateController = new ProductStateControllerProvider(StatePropertyNames.product, emptyProductFactory, [titleIndex, valueIndex]);
    const positionStateController = new PositionStateControllerProvider(StatePropertyNames.position, emptyPositionFactory, [costIndex, productIndex, wishListPosition]);

    const ApplicationStateControllerPool = new StateControllerPoolProvider(appStateController, productStateController, positionStateController);
    const reducer = ApplicationStateControllerPool.makeReducer();

    const store = createStore(reducer);

    ApplicationStateControllerPool.plugIn(store);
}

export const initialQuery = (
    ApplicationStateControllerPool: StateControllerPool,
    titleIndex: HashIndex<IProduct, number>,
    valueIndex: HashIndex<IProduct, number>,
) => {

    const productStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.product) as IEntityStateController<IProduct>;

    const defaultQueried = productStateController.query();
    const sortedByTitle = productStateController.query(titleIndex.indexKey);
    const sortedByValue = productStateController.query(valueIndex.indexKey);
}

export const commonPurchaise = (
    ApplicationStateControllerPool: StateControllerPool,


    titleIndex: HashIndex<IProduct, number>,
    valueIndex: HashIndex<IProduct, number>,

    costIndex: HashIndex<IPosition, number>,
    wishListPosition: HashIndex<IPosition, boolean>,
) => {
    const productStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.product) as IEntityStateController<IProduct>;
    const positionStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.position) as IEntityStateController<IPosition>;

    const productSelectedById = productStateController.select(null, 'someId');
    const productSelectedByValue = productStateController.select(valueIndex.indexKey, 42);
    const productSelectedByTitle = productStateController.select(titleIndex.indexKey, 'someTitle');

    const queryInRange = productStateController.query(valueIndex.indexKey, (indexValue: number) => (indexValue > 10) && (indexValue < 20));

    if (queryInRange.length) {
        // we want first that require our query
        const position1 = positionStateController.factory(queryInRange[0], 1);
        positionStateController.add(position1);                
    }

    const position2 = positionStateController.factory(productSelectedById, 2);
    positionStateController.add(position2);

    const position3 = positionStateController.factory(productSelectedByTitle, 2);
    positionStateController.add(position3);

    positionStateController.delete(position2.id);

    const positionToModify = positionStateController.select(null, position3.id);
    
    if (positionToModify) {
        // diff may be better?
        positionToModify.amount = 5;
        positionStateController.modify(positionToModify);
    }

    // Show by price (we care more about most valuables)
    const chart = positionStateController.query(costIndex.indexKey);

    // Show wishes that are about to get complete
    const positionsThatFullfillWisshes = positionStateController.query(wishListPosition.indexKey);
}    

export const appStateScenario =
(
    ApplicationStateControllerPool: StateControllerPool,
) => {
    
    const appStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app) as IStateController<IAppState>;

    const diff: TPartialAppState = {
        isLoading: true,
    }
    appStateController.set(diff);

    appStateController.reset();
}

export const manualOrderScenario =
(
    ApplicationStateControllerPool: StateControllerPool,
) => {

    const appStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.app) as IStateController<IAppState>;
    const positionStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.position) as IEntityStateController<IPosition>; 

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

        // change places first and third
        const newOrder = moveItem(manualOrder, 0, 2);
        const diff: TPartialAppState = {
            manualOrder: newOrder,
        }
        appStateController.set(diff);
    }
}
