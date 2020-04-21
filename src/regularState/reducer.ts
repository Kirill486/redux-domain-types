import { IEntityState, IAction, CsudActions, IEntity, IEntityCommon } from "../lib/types";
import { EntityController } from "../lib/EntityActions";
import { IPersonEntity, personFabric } from "./domainTypes";

export const entityModelController = new EntityController<IEntity<IPersonEntity>>('person', personFabric);

export const regularEntityReducer =
<Entity extends IEntityCommon>(
  state: IEntityState<Entity> = {},
  {type, payload}: IAction<Entity> | IAction<IEntityState<Entity>> | IAction<string>,
) => {
  switch (type) {
    case CsudActions.CREATE: {
      const entity = entityModelController.getEmptyEntity();
      
      if (state[entity.id]) {
        console.warn('You should not use create for update');
      }
      return {
        ...state,
        [entity.id]: entity,
      }
    }
    case CsudActions.SET: {
      const state = payload as IEntityState<Entity>;
      return state;
    }
    case CsudActions.UPDATE: {
      const entity = payload as Entity;
      if (!state[entity.id]) {
        console.warn('You should not use update for create');
      }
      return {
        ...state,
        [entity.id]: entity,
      }
    }
    case CsudActions.DELETE: {
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