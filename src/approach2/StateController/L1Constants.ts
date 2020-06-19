// L1 Provides the whole state

import { IActionOfType, IActionCreator } from "../../definitions";

export enum L1ActionTypes {
  SET_STATE ='SET_STATE',
  RESET_STATE = 'RESET_STATE',
}

export type L1Action<Payload> = IActionOfType<L1ActionTypes, Payload>;

export interface L1ActionSet<State> {
  [L1ActionTypes.SET_STATE]: IActionCreator<L1ActionTypes, State>;
  [L1ActionTypes.RESET_STATE]: IActionCreator<L1ActionTypes, undefined>;
}