import { Action } from "redux";

export type id = string;

export interface IEntityCommon {
  id: string;
}

export interface IIndexCommon {
  id: number;
}

export type IEntity<DomainType> = DomainType & IEntityCommon;

export type IIndex<DomainType> = DomainType & IIndexCommon;


export type IRecordState<RecordType> = {[key: string]: RecordType };

export type Reducer<State> =
(state: State, action: IAction<any>) => State;

export type Selector<State, Data> = (
  state: State,
  ...queryParams: any
) => Data;

// Clients should not worry what from we select stuff
export type ClientSelector<Data> = (...queryParams: any) => Data;

export type IndexSelector<State, Data> = (
  state: State,
  indexKey: string,
  ...indexQueryParams: any
) => Data;

export interface IAction<Payload> extends Action {
  payload: Payload;
}

export interface IActionOfType<Types, Payload> {
  type: Types;
  payload: Payload;
};

export type IRecordActionOfType<Types, DomainType> = IActionOfType<Types, IEntity<DomainType>>;

export type Factory<Entity> = (...args: any) => Entity;

export type EntityFabric<Entity extends IEntity<any>> = (...args: any) => Entity;

export interface Index<IndexValue> {
  indexKey: string;
  index: IndexValue;
}

export type HashCode<Entity> = (record: Entity) => number;

export type HashIndex<Entity> = Index<HashCode<Entity>>;

// We have literal command - query separation.

export type command = (...args: any) => void;
export type Dispatch = command;

export type Query<Data> = (...args: any) => Data;
