import { command, id } from '../utils/definitions';

type SomeState = any;

export interface ICanConnectToPool<DomainEntityType> {
    connect: command;
    readonly isConnected: boolean;
    readonly controllersKeys: string[];

    getById: (id: id, propertyTitle?: string) => DomainEntityType;
    getStateProperty: (propertyTitle: string) => SomeState;

    notifyPool: command;
}
