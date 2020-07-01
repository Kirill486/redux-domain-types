import { IProduct, IPosition } from "./domainTypes";
import { EntityFabric, IActionCreator, HashIndex, Selector, Dispatch, Query } from "../src/definitions"

// So, let's assume we have all good stuff implemented.
// How would we use it?

export const commonScenario = (
    dispatch: Dispatch,
    getState: Query<any>,
    productFactory: EntityFabric<IProduct>,
    addProduct: IActionCreator<any, IProduct>,

    addProductHachNumberIndex: IActionCreator<any, HashIndex<IProduct, number>>,
    titleHach: HashIndex<IProduct, number>,

    selectProducts: Selector<any, IProduct[]>,
    selectSingleProduct: Selector<any, IProduct>,
    
    positionFactory: EntityFabric<IPosition>,
    addPosition: IActionCreator<any, IProduct>,
    modifyPosition: IActionCreator<any, IProduct>,
    deletePosition: IActionCreator<any, IProduct>,

    addPositionHashNumberIndex: IActionCreator<any, HashIndex<IProduct, number>>,
    costHash: HashIndex<IPosition, number>,

    selectPositions: Selector<any, IPosition[]>,
    selectSinglePosition: Selector<any, IPosition>,
) => {

    // App initialization
    // Domain Types Are defined in a separate file

    dispatch(addProduct(productFactory()));
    dispatch(addProduct(productFactory()));

    dispatch(addProductHachNumberIndex(titleHach));

    dispatch(addPositionHashNumberIndex(costHash));

    // Common Use cases

    const sortedByTitle = selectProducts(getState(), titleHach.indexKey);
    const defaultSorted = selectProducts(getState(), null);

    let selectedById: IProduct;
    let selectedByTitle: IProduct;

    try {
        selectedById = selectSingleProduct(getState(), null, 'someId');
        selectedByTitle = selectSingleProduct(getState(), titleHach.indexKey, 'title');
    } catch(exception) {
        // Failed attempt to select by is most likely data incosistensy
        // So, we throw instead of returning null
        // This behavior can be extended)
        console.log(exception);
    }

    const position1 = positionFactory(selectedById, 1);
    dispatch(addPosition(position1));

    const position2 = positionFactory(selectedByTitle, 2);
    dispatch(addPosition(position2));

    const position3 = positionFactory(selectedById, 1);
    dispatch(addPosition(position3));


}