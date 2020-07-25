const postfix = 'test_env';

// Avoiding Magic Strings
export const StatePropertyNames = Object.freeze({
    product: `product_${postfix}`,
    position: `position_${postfix}`,
    app: `app_${postfix}`,
    appMain: `main_application${postfix}`,
});

// Looks like a Use case for Pool here:
// -- combine properiest reducers
// -- manage pointer safety
// -- manage index pointer sefety

// export const initializeStoreWithPositionStateControllerAndData = () => {
//     const {store: prosuctStore, prods, controller: prodsController} = initializeStoreWithProductStateControllerAndData();
//     const {store: positionStore, controller: positionController} = initializeStoreWithPositionStateController();
    
//     const position1: IEntity<IPosition> = {
//         id: '12345',
//         amount: 55,
//         product: prods[0].id,
//     }

//     const position2: IEntity<IPosition> = {
//         id: '123452354',
//         amount: 552,
//         product: prods[1].id,
//     }

//     const positions = [position1, position2];
//     positionController.add(positions);

//     return {positionStore, positionController, positions, prosuctStore, prods, prodsController};
// }