import * as assert from 'assert';
import { titleIndex, valueIndex } from '../api/constants.indexes';
import { ReduxEntityStateController } from '../../src';
import { initializeProductEntityStateController } from '../api/constants.entity';


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
        const reducerMappedProperty = productStateController.makeReducer();
        const reducerProperty = reducerMappedProperty[productStateController.propertyTitle];

        const anyAction = {
            type: 'any',
            payload: undefined,
        }

        const stateInitial = reducerProperty(undefined, anyAction) as object;

        const stateInitialIsNotNullObject = (typeof stateInitial === 'object') && (stateInitial !== null);
        assert.ok(stateInitialIsNotNullObject);

        const dataProperty = productStateController.dataProperyTitle;
        assert.ok(typeof dataProperty === "string")
        assert.ok(dataProperty.includes(productStateController.propertyTitle));
        assert.ok(dataProperty.includes(ReduxEntityStateController.dataPrefix));

        const hasDataProperty = stateInitial.hasOwnProperty(dataProperty);
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
