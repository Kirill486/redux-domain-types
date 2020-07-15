
import * as assert from 'assert';
import { initializeRecordStateController, IUserData } from "../api/constants.record";
import { IRecordState } from '../../utils/definitions';

describe('RecordStateController extends redux API', () => {
  
    it('has makeReducer method that returns an object with key and reducer props', () => {

        const appStateController = initializeRecordStateController();
        const reducerProperty = appStateController.makeReducer();

        const reducerKey = Object.keys(reducerProperty);
        assert.equal(reducerKey.length, 1);

        const reducer = reducerProperty[reducerKey[0]];
        assert.equal(typeof reducer, "function");
    });

    it('reducer can be executed with state and it will return state', () => {
        const appStateController = initializeRecordStateController();
        const reducerProperty = appStateController.makeReducer();

        const reducerKey = Object.keys(reducerProperty);
        assert.equal(reducerKey.length, 1);
        const reducer = reducerProperty[reducerKey[0]];

        const someState: IRecordState<IUserData> = {
            'id': {
                firstName: 'Maky',
                lastName: 'Kurie',
            }
        }

        const state = reducer(someState, { type: 'any', payload: null });

        assert.deepEqual(state, someState);
    });    
});
