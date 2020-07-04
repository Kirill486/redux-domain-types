import { IEntityStateController } from "../api_describtion/entityStateController";
import { Factory, HashIndex } from "../utils/definitions";

export class ReduxEntityStateController<Entity> implements IEntityStateController<Entity> {
    constructor(
        propertyTitle: string,
        factoryMethod: Factory<Entity>,
        indexes: Array<HashIndex<Entity, any>>,
    ) {
        // Nothing yet
    }

    factory: () => null;
    includes: () => false;

    add: (entity?: Entity) => void;
    modify: () => void;
    delete: () => void;

    select: (indexKey?: string, value?: any) => null;
    query: (indexKey?: string, ...args: any[]) => [];
}
