import { EntityStateController } from "./entityStateController";
import { IStateController } from "./stateController";

export type AnyStateController = EntityStateController<any> | IStateController<any>;

type ControllerPool = { [propertyKey: string]: AnyStateController }

interface StateControllerPool {

    controllerPool: ControllerPool;
    getController: (property: string) => AnyStateController;
}