import { IAction } from "./lib/types";

export type id = string;

export interface IEntityCommon {
  id: string;
}

// Entity always has Id
export type IEntity<DomainType> = DomainType & IEntityCommon;

// Entity state is key mapped object
export type IEntityState<Entity> = {[key: string]: IEntity<Entity> };

export type Reducer<State> =
(state: State, action: IAction<any>) => State;

export type Selector<State, Data> = (
  state: State,
  ...queryParams: any
) => Data;

export type IndexSelector<State, Data> = (
  state: State,
  indexKey: string,
  ...indexQueryParams: any
) => Data;

export interface IActionOfType<Types, Payload> {
  type: Types;
  payload: Payload;
};

export type IActionCreator<Types, Payload> = (...actionArgs: any) => IActionOfType<Types, Payload>;
