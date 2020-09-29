import { IEntityStateController } from "./entityStateController";
import { IStateController } from "./stateController";
import { Reducer, Factory, id, command, ClientSelector, Index, HashCode } from "../utils/definitions";

export type AnyStateController = IEntityStateController<any> | IStateController<any>;

export interface IExtendReduxAPI<State> {
    propertyTitle: string;
    getControllerProperty: () => State;

    makeReducer: Factory<ReducerMappedToProperty<State>>;
    plugIn: (commandEntryPoint: command, rootGetStateSelector: ClientSelector<State>) => void;
    isPlugged: () => boolean;
}

export type StatePropertyKeyEntityData<Entity> = { [entityKey: string] : Entity };

export type IndexHash = { [indexValue: string]: id[] };
export type Ordered = id[];

export type ReducerMappedToProperty<State> = { [properyKey: string]: Reducer<State> };

export type HashIndex<Entity> = Index<HashCode<Entity>>;
