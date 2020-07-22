import { IEntityStateController } from "./entityStateController";
import { IStateController } from "./stateController";
import { Reducer, Factory, id } from "../utils/definitions";

export type AnyStateController = IEntityStateController<any> | IStateController<any>;

export interface StateControllerPool extends IExtendReduxAPI<any> {    
    getControllerFor: (property: string) => AnyStateController;
}

export interface IExtendReduxAPI<State> {    
    propertyTitle: string;
    
    makeReducer: Factory<ReducerMappedToProperty<State>>;
    plugIn: (commandEntryPoint: any) => void;
    isPlugged: () => boolean;
}

export type StatePropertyKeyEntityData<Entity> = { [entityKey: string] : Entity };

export type IndexHash = { [indexValue: string]: id[] };
export type Ordered = id[];

export type ReducerMappedToProperty<State> = { [properyKey: string]: Reducer<State> };
