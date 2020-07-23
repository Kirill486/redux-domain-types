import { EntityFabric, IEntity, ClientSelector, command } from "../utils/definitions";
import { IExtendReduxAPI } from "./libraryApi";

export interface IEntityStateInstanceController<Entity> {
    factory: EntityFabric<IEntity<Entity>>,
    includes: ClientSelector<boolean>,
}

export interface IEntityStateCommandController<Entity> {
    add: command,
    modify: command,
    delete: command,
}

export interface IEntityStateQueryController<Entity> {
    query: ClientSelector<Array<IEntity<Entity>>>,
    select: ClientSelector<IEntity<Entity>>,
}

export type EntityState = any;

export interface IEntityStateController<Entity> extends
IEntityStateInstanceController<Entity>,
IEntityStateCommandController<Entity>,
IEntityStateQueryController<Entity>,
IExtendReduxAPI<EntityState> {}
