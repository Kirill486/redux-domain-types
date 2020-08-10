import { Factory, id, IEntity } from "../../utils/definitions";

// if no linked to - will search by state
export interface ILinkedProperty {
    linkedKey: string;
    lilnkedTo?: string;
}

export interface IEntityFactoryMethod<Entity> {
    factory: Factory<Entity>;
    linkedProperties: ILinkedProperty[];
}

export type AddAccepts<DomainType> =
    DomainType |
    DomainType[] |
    IEntity<DomainType> |
    IEntity<DomainType>[];