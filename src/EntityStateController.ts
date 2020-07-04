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

    add: () => void;
    modify: () => void;
    delete: () => void;

    select: () => null;
    query: () => [];
}
