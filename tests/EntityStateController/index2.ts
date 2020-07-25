import { NotImplementedYetException } from "../../src/exceptions";
import { initializeStoreWithProductStateControllerAndData } from "../api/constants.entity";

describe('Complex indexes DO require a query to state to get calculated', () => {
    
    it('has index data', () => {
        // position indexes are calculated
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('index will change if dependent entity changed', () => {
        // change product value
        // dependent position costIndex should update
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('entityid will be deleted from index if the entity is deleted', () => {
        // delete position
        // its id should be deleted from index
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('when delete dependent data', () => {
        // delete product
        // dependent position should be deleted
        // dependent position costIndex should update
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });
});