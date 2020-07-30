import { ICanConnectToPool } from '../../api_describtion/ControllerPoolConnector';
import { StateControllerPool } from '../../api_describtion/StateControllerPool';
import { ReduxEntityStateController } from '../EntityStateController/EntityStateController';
import { id, command } from '../../utils/definitions';
import { PoolConnectorCanNotFindRecordById, ControllerPoolAttemptToGetUnknownStateProperty, PoolConnectorAttemptToUseDisconnected } from './exceptions';
import { ReduxStateController } from '../StateController/StateController';

export class StateControllerPoolConnector<DomainEntityType> implements ICanConnectToPool<DomainEntityType> {
    notifyPool: command;
    controllerPool: StateControllerPool;

    connect = (pool: StateControllerPool) => {
        this.controllerPool = pool;
    }

    get isConnected() {
        return !!this.controllerPool;
    }

    get controllersKeys() {
        return this.controllerPool.controllersKeys;
    };

    controllerIncludesRecord = (controller: ReduxEntityStateController<any>, id: id) => controller.includes(id);

    controllerData = <DomainType>(controller: ReduxEntityStateController<DomainType>, id: id): DomainType => controller.getById(id);

    getById = (id: id, propertyTitle: string) => {

        if (this.isConnected) {
            let controllerArray: ReduxEntityStateController<any>[];
            if (propertyTitle) {
                controllerArray = [this.controllerPool.getControllerFor(propertyTitle) as ReduxEntityStateController<any>];
            } else {
                controllerArray = this.controllerPool.entityControllersKeys.map((entityControllerKey) =>
                    this.controllerPool.getControllerFor(entityControllerKey)) as ReduxEntityStateController<any>[];
            }

            const correspondingController = controllerArray.find((controller) => controller.includes(id));

            if (correspondingController) {
                return this.controllerData(correspondingController, id);
            } else {
                const propertiesVisited = controllerArray.map((controller) => controller.propertyTitle);
                throw PoolConnectorCanNotFindRecordById(id, propertyTitle, propertiesVisited);
            }
        } else {
            throw PoolConnectorAttemptToUseDisconnected()
        }

    };

    getStateProperty = (propertyTitle: string) => {

        if (this.isConnected) {
            const propertyExist = this.controllerPool.stateControllersKeys.includes(propertyTitle);

            if (propertyExist) {
                const controller = this.controllerPool.getControllerFor(propertyTitle) as ReduxStateController<any>;
                return controller.select();
            } else {
                throw ControllerPoolAttemptToGetUnknownStateProperty(propertyTitle);
            }
        }
    }
}
