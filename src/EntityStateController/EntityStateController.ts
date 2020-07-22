import { IEntityStateController } from "../../api_describtion/entityStateController";
import { Factory, HashIndex, id } from "../../utils/definitions";

export interface IEntityFactoryMethod<Entity> {
    factory: Factory<Entity>;
    linkedProperties: id[];
}

export class ReduxEntityStateController<Entity> implements IEntityStateController<Entity> {

    static dataPrefix = 'data';
    
    public propertyTitle;
    
    constructor(
        propertyTitle: string,
        factoryMethod: IEntityFactoryMethod<Entity>,
        indexes: Array<HashIndex<Entity>>,
    ) {
        this.propertyTitle = propertyTitle;
        // Nothing yet
    }

    isPlugged: () => false;

    factory: () => null;
    includes: () => false;

    add: (entity?: Entity | Entity[]) => void;
    modify: (entity?: Partial<Entity>) => void;
    delete: (id: id | id[]) => void;

    select: (indexKey?: string, value?: any) => null;
    query: (indexKey?: string, ...args: any[]) => [];

    makeReducer: () => null;
    plugIn: (dispatch) => void;
}
