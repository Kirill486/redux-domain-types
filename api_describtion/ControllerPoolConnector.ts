import { command, id } from '../utils/definitions';
import { StateControllerPool } from './StateControllerPool'
import { ReduxEntityStateController } from '../src';

export interface ICanConnectToPool<DomainEntityType> {
    connect: command;
    readonly isConnected: boolean;
    readonly controllersKeys: string[];

    getById: (id: id, propertyTitle?: string) => DomainEntityType;
}
