import { Action } from "redux";

export enum CsudActions {
  CREATE = 'CREATE',
  SET = 'SET',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface IEntittyCommon {
  id: string;
}

export type IEntity<DomainType> = DomainType & IEntittyCommon;

export type IEntityState<Entity extends IEntity<any>> = {[key: string]: Entity };

export interface IAction<Entity extends IEntity<any>> extends Action {
  payload: Entity;
}
