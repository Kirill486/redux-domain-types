import { IEntityStateController } from "../../api_describtion/entityStateController";
import { Factory, HashIndex, id } from "../../utils/definitions";

export interface IEntityFactoryMethod<Entity> {
    factory: Factory<Entity>;
    linkedProperties: id[];
}

export class ReduxEntityStateController<Entity> implements IEntityStateController<Entity> {
    constructor(
        propertyTitle: string,
        factoryMethod: IEntityFactoryMethod<Entity>,
        indexes: Array<HashIndex<Entity, any>>,
    ) {
        // Nothing yet
    }

    isPlugged: () => false;

    factory: () => null;
    includes: () => false;

    add: (entity?: Entity) => void;
    modify: () => void;
    delete: () => void;

    select: (indexKey?: string, value?: any) => null;
    query: (indexKey?: string, ...args: any[]) => [];

    makeReducer: () => null;
    plugIn: (dispatch) => void;
}
