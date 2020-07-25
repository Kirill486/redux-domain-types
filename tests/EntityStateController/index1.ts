import * as assert from 'assert';
import { initializeStoreWithProductStateControllerAndData } from '../api/constants';
import { NotImplementedYetException } from '../../src/exceptions';

describe('Simple indexes do not require another entities to get calculated', () => {
    it('has index data', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('index data created on entity creation', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('index data updated on entity update', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('index data deleted on entity delete', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('index value can contain a few entities', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('key can be moved between store properties on index recalculation', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

    it('throws on attempt to use complex index without Pool', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        throw NotImplementedYetException();
    });

});
