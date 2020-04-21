import { Action } from "redux";

export enum CsudActions {
  CREATE = 'CREATE',
  SET = 'SET',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface IEntityCommon {
  id: string;
}

export type id = string;

export type IEntity<DomainType> = DomainType & IEntityCommon;

export type IEntityState<Entity extends IEntity<any>> = {[key: string]: Entity };

export interface IAction<Entity extends IEntity<any>> extends Action {
  payload: Entity;
}

export type EntityFabric<Entity extends IEntity<any>> = () => Entity;
