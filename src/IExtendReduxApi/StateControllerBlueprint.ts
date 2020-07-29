import { command, Reducer, ClientSelector } from "../../utils/definitions";
import { StateControllerUnknownRootPropertyName, UnpluggedControllerOperation } from "../exceptions";
import { IExtendReduxAPI } from "../../api_describtion/libraryApi";

export abstract class StateControllerBlueprint<State>
implements IExtendReduxAPI<State> {
    public propertyTitle: string;
    plugged: boolean = false;

    commandEntryPoint: command;
    rootSelector: () => State;


    constructor(propertyTitle: string) {
        this.propertyTitle = propertyTitle;
    }

    public plugIn(commandEntryPoint: command, rootGetStateSelector: ClientSelector<any>) {
        this.commandEntryPoint = commandEntryPoint;
        this.rootSelector = rootGetStateSelector;

        this.plugged = true;

        if (this.afterPlugIn) {
            this.afterPlugIn();
        }
    }

    getControllerProperty = () => {
        const state = this.rootSelector();

        if (!this.isPlugged()) {
            throw UnpluggedControllerOperation(this.propertyTitle);
        }

        const controllerProperty: State = state[this.propertyTitle];
        const controllerPropertyIsDefined = typeof controllerProperty !== "undefined";

        if (controllerPropertyIsDefined) {
            return controllerProperty;
        } else {
            throw StateControllerUnknownRootPropertyName(this.propertyTitle);
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
