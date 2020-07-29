import { Factory, id, IEntity } from "../../utils/definitions";

export interface IEntityFactoryMethod<Entity> {
    factory: Factory<Entity>;
    linkedProperties: id[];
}

export type AddAccepts<DomainType> =
    DomainType |
    DomainType[] |
    IEntity<DomainType> |
    IEntity<DomainType>[];