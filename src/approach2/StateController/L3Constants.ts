// L3 Provides us with Entity. 
// Entity is a Record with buisiness logic indexes associated

import { IRecordActionCreator } from "../../definitions";

export enum L3ActionTypes {
  CREATE_ENTITY ='CREATE_ENTITY',
  UPDATE_ENTITY = 'UPDATE_ENTITY',
  DELETE_ENTITY = 'DELETE_ENTITY',
}

export type L3Action<Payload> = IRecordActionCreator<L3ActionTypes, Payload>;
