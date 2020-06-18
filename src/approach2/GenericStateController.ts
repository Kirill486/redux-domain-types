import { Reducer, IActionSet } from "../definitions";

// Our Stater controllers have one thing in common
// They make reducers (either just for state or for state and indexes)
// They make actionSet for exact this part of state accoding to their level

export interface IGenericStateController {
  makeReducer: () => Reducer<any>;
  actionSet: IActionSet;
}
