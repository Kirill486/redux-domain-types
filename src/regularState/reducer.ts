import { IEntityState, IAction, CsudActions, IEntity, IEntittyCommon } from "../lib/types";

export const regularEntitiReducer =
<Entity extends IEntittyCommon>(
  state: IEntityState<Entity>,
  {type, payload}: IAction<Entity> | IAction<IEntityState<Entity>> | IAction<string>,
) => {
  switch (type) {
    case CsudActions.CREATE: {
      const entity = payload as Entity;
      
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