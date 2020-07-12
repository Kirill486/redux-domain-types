import { IEntityStateController } from "./entityStateController";
import { IStateController } from "./stateController";
import { Reducer, Factory, id } from "../utils/definitions";

export type AnyStateController = IEntityStateController<any> | IStateController<any>;

export interface StateControllerPool extends IExtendReduxAPI<any> {    
    getControllerFor: (property: string) => AnyStateController;
}

export interface IExtendReduxAPI<State> {
    makeReducer: Factory<Reducer<State>>;
    plugIn: (commandEntryPoint: any) => void;
}

export type StatePropertyKeyEntityData<Entity> = { [entityKey: string] : Entity };

export type IndexHash = { [indexValue: string]: id[] };
export type Ordered = id[];



