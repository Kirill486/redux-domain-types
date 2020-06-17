import { Reducer, IActionOfType, IActionCreator } from "../../definitions";
import { L1ActionTypes, L1ActionSet, L1Action } from "./actions";
import { deepClone } from "../../utils/deepClone";

export abstract class StateProviderL1Blueprint<State> {

  initialState: State;
  actionSet: L1ActionSet<State>;
  propertyKey: string;

  private L1SetAction: IActionCreator<L1ActionTypes, State> =
  (state: State) => {

    const setAction: IActionOfType<L1ActionTypes, State> = {
      type: L1ActionTypes.SET_STATE,
      payload: state,
    }

    return setAction;
  };

  private L1ResetAction: IActionCreator<L1ActionTypes, undefined> =
  () => {

    const resetAction: IActionOfType<L1ActionTypes, undefined> = {
      type: L1ActionTypes.SET_STATE,
      payload: undefined,
    }

    return resetAction;
  };
  

  constructor(propertyKey: string, initialState: State) {
    
    if (!propertyKey) {
      throw propertyKeyMustBeDefined();
    }
    this.propertyKey = propertyKey;
    
    if (typeof initialState === "undefined") {
      throw initialStateMustBeDefined(this.propertyKey);
    }    
    
    this.initialState = initialState;    

    this.actionSet = {
      SET_STATE: this.L1SetAction,
      RESET_STATE: this.L1ResetAction,
    }
  }

  makeReducer = () => {
    const L1Reducer: Reducer<State> = (state, {type, payload}: L1Action<any>) => {
      switch (type) {
        case L1ActionTypes.SET_STATE: {
          if (typeof payload === "undefined") {
            throw willNotSetStateToUndefined(this.propertyKey);
          }
          return payload;
        }

        case L1ActionTypes.RESET_STATE: {
          const newState = deepClone(this.initialState);
          return newState;
        }

        default: {
          return state;
        }
      }
    };

    return L1Reducer;
  } 
}

const willNotSetStateToUndefined = (propertyKey: string) => new Error(`Will not set state for key ${propertyKey} to undefined`);
const initialStateMustBeDefined = (propertyKey: string) => new Error(`Initial state for key ${propertyKey} must be defined`);
const propertyKeyMustBeDefined = () => new Error('Property key must be defined');
