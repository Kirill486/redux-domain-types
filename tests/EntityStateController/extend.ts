import * as assert from 'assert';
import { initializeProductEntityStateController } from "../api/constants";
import { titleIndex, valueIndex } from '../api/constants.indexes';


describe('EntityStateController extends redux API', () => {
  
    it('has makeReducer method that returns an object with key and reducer props', () => {

        const productStateController = initializeProductEntityStateController();
        const reducerProperty = productStateController.makeReducer() as any;

        const reducerKey = Object.keys(reducerProperty);
        assert.equal(reducerKey.length, 1);

        const reducer = reducerProperty[reducerKey[0]];
        assert.equal(typeof reducer, "function");
    });

    it('initial state has data property', () => {

        const productStateController = initializeProductEntityStateController();
        const reducerProperty = productStateController.makeReducer() as any;

        const stateInitial = reducerProperty(undefined, {type: 'any'}) as object;

        const stateInitialIsNotNullObject = (typeof stateInitial === 'object') && (stateInitial !== null);
        assert.equal(stateInitialIsNotNullObject, true);

        const hasDataProperty = stateInitial.hasOwnProperty('data');
        assert.equal(hasDataProperty, true);
    });

    it('initial state has index propertyes', () => {

        const productStateController = initializeProductEntityStateController();
        const reducerProperty = productStateController.makeReducer() as any;

        const stateInitial = reducerProperty(undefined, {type: 'any'}) as object;

        const stateInitialIsNotNullObject = (typeof stateInitial === 'object') && (stateInitial !== null);
        assert.equal(stateInitialIsNotNullObject, true);

        // Indexes set on initialization
        const hasTitleIndexPropertyProperty = stateInitial.hasOwnProperty(titleIndex.indexKey);
        assert.equal(hasTitleIndexPropertyProperty, true);

        const hasValueIndexPropertyProperty = stateInitial.hasOwnProperty(valueIndex.indexKey);
        assert.equal(hasValueIndexPropertyProperty, true);
    });
});
