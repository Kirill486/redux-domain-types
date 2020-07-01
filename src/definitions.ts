import { IAction } from "./lib/types";

export type id = string;

export interface IRecordCommon {
  id: string;
}

// Record always has Id
export type IRecord<DomainType> = DomainType & IRecordCommon;

// Record state is key mapped object
export type IRecordState<DomainType> = {[key: string]: IRecord<DomainType> };

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

export interface IActionOfType<Types, Payload> {
  type: Types;
  payload: Payload;
};

export type IRecordActionOfType<Types, DomainType> = IActionOfType<Types, IRecord<DomainType>>;

export type IActionCreator<Types, Payload> = (...actionArgs: any) => IActionOfType<Types, Payload>;

export type IRecordActionCreator<Types, DomainType> = (...actionArgs: any) => IRecordActionOfType<Types, DomainType>;

// In this context set means kit and not the data structure
export type IActionSet = { [actionType: string] : IActionCreator<any, any> };

// Set also means kit in this context
export type ISelectorSet = { [selectorType: string] :Selector<any, any> };

export type Factory<Entity> = (...args: any) => Entity;

export type EntityFabric<Entity extends IRecord<any>> = (...args: any) => Entity;

export interface Index<IndexValue> {
  indexKey: string;
  index: IndexValue;
}

export type HashCode<Record, Result> = (record: Record) => Result;

export type HashIndex<Record, Result> = Index<HashCode<Record, Result>>;
// export type BuisinessIndex<Record, Result> = Index<HashCode<Record, Result>>;

// We have literal command - query separation.

export type command = (...args: any) => void;
export type Dispatch = command;

export type Query<Data> = (...args: any) => Data;
