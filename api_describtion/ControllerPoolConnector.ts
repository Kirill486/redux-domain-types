import { command, id, IEntity } from '../utils/definitions';

type SomeState = any;
type AnyDomainType = any;

export interface ICanConnectToPool {
    connect: command;
    readonly isConnected: boolean;
    readonly controllersKeys: string[];

    getFromPoolById: (id: id, propertyTitle?: string) => IEntity<AnyDomainType>;
    getStateProperty: (propertyTitle: string) => SomeState;

    notifyPool: command;
}
