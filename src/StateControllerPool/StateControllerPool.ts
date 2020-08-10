import { AnyStateController, ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";
import { StateControllerPool } from "../../api_describtion/StateControllerPool";
import { DuplicateProperyTitle, CannotGetControllerForKey } from "./exceptions";
import { ReduxEntityStateController } from "..";
import { ReduxStateController } from "../StateController/StateController";
import { combineReducers } from "redux";
import { StateControllerPoolConnector } from "../StateControllerPoolConnector/ControllerPoolConnector";

export class ReduxStateControllerPool extends StateControllerBlueprint<any> implements StateControllerPool {
    stateControllers: { [priopertyTitle: string]: AnyStateController } = {};

    constructor(
        properyTitle: string,
        ...stateControllers: AnyStateController[]
    ) {
        super(properyTitle);

        stateControllers.forEach((controller) => {
            const stateControllersKeys = Object.keys(this.stateControllers);

            if (stateControllersKeys.includes(controller.propertyTitle)) {
                throw DuplicateProperyTitle(controller.propertyTitle)
            }

            this.stateControllers[controller.propertyTitle] = controller;
        });
    }

    entityChanged: (propertyTitle: string, id: any) => void;
    stateChanged: (propertyTitle: string) => void;

    get controllersKeys() {
        return Object.keys(this.stateControllers);
    };

    get entityControllersKeys() {
        const controllerKeys = this.controllersKeys;
        const entityControllerKeys = controllerKeys.filter((key) => this.stateControllers[key] instanceof ReduxEntityStateController)
        return entityControllerKeys;
    }

    get stateControllersKeys() {
        const controllerKeys = this.controllersKeys;
        const entityControllerKeys = controllerKeys.filter((key) => this.stateControllers[key] instanceof ReduxStateController)
        return entityControllerKeys;
    }

    makeReducerInner = () => {
        let result: ReducerMappedToProperty<any> = {};
        this.controllersKeys.forEach((key) => {
            result = {
                ...result,
                ...this.stateControllers[key].makeReducer()
            };
        });
        return combineReducers(result);
    };

    getControllerFor = (property: string) => {
        const validKey = this.controllersKeys.includes(property);
        if (validKey) {
            const correspondingController = this.stateControllers[property];
            return correspondingController;
        } else {
            throw CannotGetControllerForKey(property);
        }
    };

    afterPlugIn = () => {
        this.controllersKeys.forEach((key) => {
            const controller = this.getControllerFor(key);
            if (controller instanceof StateControllerPoolConnector) {
                controller.connect(this);
            }
        });
    }
}
