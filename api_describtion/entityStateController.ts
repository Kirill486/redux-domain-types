import { EntityFabric, IRecord, ClientSelector, command } from "../utils/definitions";
import { IExtendReduxAPI } from "./libraryApi";

export interface IEntityStateInstanceController<Entity> {
    factory: EntityFabric<IRecord<Entity>>,
    includes: ClientSelector<boolean>,
}

export interface IEntityStateCommandController<Entity> {
    add: command,
    modify: command,
    delete: command,
}

export interface IEntityStateQueryController<Entity> {
    query: ClientSelector<Array<IRecord<Entity>>>,
    select: ClientSelector<IRecord<Entity>>,
}

export type EntityState = any;

export interface IEntityStateController<Entity> extends
IEntityStateInstanceController<Entity>,
IEntityStateCommandController<Entity>,
IEntityStateQueryController<Entity>,
IExtendReduxAPI<EntityState> {}
