import { ICanConnectToPool } from '../../api_describtion/ControllerPoolConnector';
import { StateControllerPool } from '../../api_describtion/StateControllerPool';
import { DisconnectedReduxEntityStateController } from '../DisconnectedEntityStateController/DisconnectedEntityStateController';
import { id, command } from '../../utils/definitions';
import { PoolConnectorCanNotFindRecordById, ControllerPoolAttemptToGetUnknownStateProperty, PoolConnectorAttemptToUseDisconnected } from './exceptions';
import { ReduxStateController } from '../StateController/StateController';

export class ReduxEntityStateController<DomainType>
extends DisconnectedReduxEntityStateController<DomainType>
implements ICanConnectToPool {
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

    controllerIncludesRecord = (controller: DisconnectedReduxEntityStateController<any>, id: id) => controller.includes(id);

    controllerData = <AnotherControllerDomainType>(controller: DisconnectedReduxEntityStateController<AnotherControllerDomainType>, id: id): AnotherControllerDomainType => controller.getById(id);

    getFromPoolById = (id: id, propertyTitle: string) => {

        if (this.isConnected) {
            let controllerArray: DisconnectedReduxEntityStateController<any>[];
            if (propertyTitle) {
                controllerArray = [this.controllerPool.getControllerFor(propertyTitle) as DisconnectedReduxEntityStateController<any>];
            } else {
                controllerArray = this.controllerPool.entityControllersKeys.map((entityControllerKey) =>
                    this.controllerPool.getControllerFor(entityControllerKey)) as DisconnectedReduxEntityStateController<any>[];
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
