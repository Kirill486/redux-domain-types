import { EntityFabric, IRecord, ClientSelector, command, HashIndex } from "../src/definitions";

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
    // index: command, // add index

    query: ClientSelector<Array<IRecord<Entity>>>,
    select: ClientSelector<IRecord<Entity>>,
}

export interface EntityStateController<Entity> extends
IEntityStateInstanceController<Entity>,
IEntityStateCommandController<Entity>,
IEntityStateQueryController<Entity> {}

export type TEntityStateControllerProvider<Entity> =
new (
    propertyTitle: string,
    factoryMethod: () => Entity,
    indexes: Array<HashIndex<Entity, any>>,
) => EntityStateController<Entity>;
