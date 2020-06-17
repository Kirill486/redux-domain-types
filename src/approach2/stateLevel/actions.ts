import { IActionOfType, IActionCreator } from "../../definitions";

export enum L1ActionTypes {
  SET_STATE ='RESET_STATE',
  RESET_STATE = 'RESET_STATE',
}

export type L1Action<Payload> = IActionOfType<L1ActionTypes, Payload>;

export interface L1ActionSet<State> {
  SET_STATE: IActionCreator<L1ActionTypes, State>;
  RESET_STATE: IActionCreator<L1ActionTypes, undefined>;
}
