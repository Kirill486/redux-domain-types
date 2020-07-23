import { command, Reducer } from "../../utils/definitions";
import { StateControllerUnknownRootPropertyName } from "../exceptions";
import { Store } from "redux";
import { IExtendReduxAPI } from "../../api_describtion/libraryApi";

export abstract class StateControllerBlueprint<State> implements IExtendReduxAPI<any> {
    public propertyTitle: string;
    plugged: boolean = false;

    commandEntryPoint: command;
    rootSelector: () => State;


    constructor(propertyTitle: string) {
        this.propertyTitle = propertyTitle;
    }

    public plugIn({dispatch: commandEntryPoint, getState: rootSelector}: Store<any>) {
        this.commandEntryPoint = commandEntryPoint;
        this.rootSelector = () => {
            const controllerProperty = rootSelector()[this.propertyTitle];

            if (controllerProperty) {
                return controllerProperty;
            } else {
                throw StateControllerUnknownRootPropertyName(this.propertyTitle);
            }
        };

        this.plugged = true;

        if (this.afterPlugIn) {
            this.afterPlugIn();
        }
    }

    isPlugged = () => {
        return this.plugged;
    }

    makeReducer = () => {
        const reducer = this.makeReducerInner();
        return {
            [this.propertyTitle]: reducer
        };
    }

    abstract makeReducerInner: () => Reducer<State>;
    afterPlugIn = undefined;
}