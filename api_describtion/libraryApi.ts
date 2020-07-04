import { IEntityStateController } from "./entityStateController";
import { IStateController } from "./stateController";
import { Reducer } from "../utils/definitions";

export type AnyStateController = IEntityStateController<any> | IStateController<any>;

export interface StateControllerPool {
    makeReducer: () => Reducer<any>;
    plugIn: (store) => void;
    getControllerFor: (property: string) => AnyStateController;
}

export type TStateControllerPoolProvider =
new (
    ...stateControllers: AnyStateController[]
) => StateControllerPool;
