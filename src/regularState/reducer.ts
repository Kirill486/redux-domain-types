import { IEntityState, IAction, IEntity, IEntityCommon } from "../lib/types";
import { EntityController } from "../lib/EntityActions";
import { IPersonEntity, personFabric } from "./domainTypes";
import { v4 as id } from 'uuid';

export const entityModelController = new EntityController<IEntity<IPersonEntity>>('person', personFabric);

export const regularEntityReducer =
<Entity extends IEntityCommon>(
  state: IEntityState<Entity> = {},
  {type, payload}: IAction<Entity> | IAction<IEntityState<Entity>> | IAction<string>,
) => {
  switch (type) {
    case entityModelController.createActionType: {
      const entity = entityModelController.getEmptyEntity();
      const entityId = id();
      entity.id = entityId;

      if (state[entity.id]) {
        console.warn('You should not use create for update');
      } 
      const newState = {
        ...state,
        [entity.id]: entity,
      }
      return newState;
    }
    case entityModelController.setActionType: {
      const state = payload as IEntityState<Entity>;
      return state;
    }
    case entityModelController.updateActionType: {
      const entity = payload as Entity;
      if (!state[entity.id]) {
        console.warn('You should not use update for create');
      }
      return {
        ...state,
        [entity.id]: entity,
      }
    }
    case entityModelController.deleteActionType: {
      const entityId = payload as string;
      return {
        ...state,
        [entityId]: undefined,
      }
    }
    default: {
      return state;
    }
  }
}