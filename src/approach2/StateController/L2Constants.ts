// L2 Provides the records (key - value pairs) and ByKey / AllKeysSelector

import { IActionOfType, IRecordActionCreator, IActionCreator, Selector } from "../../definitions";

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