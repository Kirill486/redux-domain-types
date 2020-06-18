import { Reducer, IActionSet, ISelectorSet, IActionOfType, IActionCreator, IIdActionCreator, Selector, IIdActionOfType, IRecordActionCreator } from "../definitions";

// Our Stater controllers have one thing in common
// They make reducers (either just for state or for state and indexes)
// They make actionSet for exact this part of state accoding to their level

export interface IGenericStateController<ActionSet extends IActionSet, SelectorSet extends ISelectorSet> {
  makeReducer: () => Reducer<any>;
  actionSet: ActionSet;
  selectorSet: SelectorSet;
}

// Like we discussed earlier, We have different levels of StateControllers

// L1 Provides the whole state

export enum L1ActionTypes {
  SET_STATE ='SET_STATE',
  RESET_STATE = 'RESET_STATE',
}

export type L1Action<Payload> = IActionOfType<L1ActionTypes, Payload>;

export interface L1ActionSet<State> {
  [L1ActionTypes.SET_STATE]: IActionCreator<L1ActionTypes, State>;
  [L1ActionTypes.RESET_STATE]: IActionCreator<L1ActionTypes, undefined>;
}

// L2 Provides the records (key - value pairs) and ByKey / AllKeysSelector

export enum L2ActionTypes {
  SET_RECORD ='SET_RECORD',
  RESET_RECORD = 'RESET_RECORD',
}

export type L2Action<Payload> = IActionOfType<L2ActionTypes, Payload>;

// To set and/or reset record we need to know the id
// We'll get it from Record.
export interface L2ActionSet<DomainType> {
  [L2ActionTypes.SET_RECORD]: IRecordActionCreator<L2ActionTypes, DomainType>;
  [L2ActionTypes.RESET_RECORD]: IActionCreator<L2ActionTypes, undefined>;
}

export enum L2SelectorTypes {
  BY_KEY ='SET_RECORD',
  ALL_KEYS = 'RESET_RECORD',
}

export interface L2SelectorSet<DomainType> {
  [L2SelectorTypes.BY_KEY]: Selector<any, DomainType>;
  [L2SelectorTypes.ALL_KEYS]: Selector<any, Array<string>>;
}

// L3 Provides us with Entity. 
// Entity is a Record with buisiness logic indexes associated

export enum L3ActionTypes {
  CREATE_ENTITY ='CREATE_ENTITY',
  UPDATE_ENTITY = 'UPDATE_ENTITY',
  DELETE_ENTITY = 'DELETE_ENTITY',
}

export type L3Action<Payload> = IRecordActionCreator<L2ActionTypes, Payload>;
