import { EntityStateController } from "./entityStateController";
import { IStateController } from "./stateController";

export type AnyStateController = EntityStateController<any> | IStateController<any>;

type ControllerPool = { [propertyKey: string]: AnyStateController }

export interface StateControllerPool {
    getControllerFor: (property: string) => AnyStateController;
}
