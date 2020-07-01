import { obviousFunction } from "../utils/obviosFunction";
import * as assert from 'assert'
import { createStore } from "redux";
import { regularEntityReducer } from "../regularState/reducer";
import { EntityController } from "../lib/EntityActions";
import { personFabric, IPersonEntity } from "../regularState/domainTypes";
import { IEntity } from "../lib/types";

describe('Obvious function', () => {
  it('should return 5', () => {
    const result = obviousFunction(2, 3);
    assert.equal(result, 5);
  });

  const {dispatch, getState} = createStore(regularEntityReducer);
  const stateController = new EntityController<IEntity<IPersonEntity>>('person', personFabric);
  dispatch({ type: 'initial' });

  const initialState = getState();

  it('should have initial state', () => {
    assert.deepEqual(initialState, stateController.getEmptyEntity());
  });

  dispatch(stateController.create());
  dispatch(stateController.create());
  const storeAfterCreation = getState();
  const stateKeys = Object.keys(storeAfterCreation);

  it('should create 2 records', () => {
    assert.equal(stateKeys.length, 2);
  });

  const entitiesInMemory = stateKeys.map((key, index): IEntity<IPersonEntity> => {
    return {
        ...storeAfterCreation[key],
        firstName: `Johhn${index}`,
        lastName: `Dow${10 - index}`,
      };
    }
  );

  it('should have 2 records with different keys', () => {
    for (const key of stateKeys) {
      assert.deepEqual(storeAfterCreation[key], stateController.getEmptyEntity());      
    }
  });

  dispatch(stateController.set({}));
  const shouldBeEmptyState = getState();

  it('should set empty state', () => {
    assert.deepEqual(shouldBeEmptyState, {});
  });

  const notEmptyState = {
    [entitiesInMemory[0].id]: entitiesInMemory[0],
    [entitiesInMemory[1].id]: entitiesInMemory[1],
  }
  dispatch(stateController.set(notEmptyState));
  const knownEntitiesState = getState();

  it('should set some state', () => {
    assert.deepEqual(knownEntitiesState, notEmptyState);
  });

  dispatch(stateController.delete(entitiesInMemory[0].id));

  it('should delete 1', () => {
    assert.equal(stateKeys.length, 1);
  });

  dispatch(stateController.delete(entitiesInMemory[1].id));

  it('should delete another', () => {
    assert.equal(stateKeys.length, 0);
  });  
});
