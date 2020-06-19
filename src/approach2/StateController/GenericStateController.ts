import { Reducer, IActionSet, ISelectorSet, IActionOfType, IActionCreator, Selector, IRecordActionCreator } from "../../definitions";

// Our Stater controllers have one thing in common
// They make reducers (either just for state or for state and indexes)
// They make actionSet for exact this part of state accoding to their level

export interface IGenericStateController<
  ActionSet extends IActionSet,
  SelectorSet extends ISelectorSet
> {
  makeReducer: () => Reducer<any>;
  actionSet: ActionSet;
  selectorSet: SelectorSet;
}

export interface IGenericIndexedStateController<
  ActionSet extends IActionSet,
  SelectorSet extends ISelectorSet,
  IndexSet extends IIndexSet
>




