import { command } from "../../utils/definitions";
import { StateControllerUnknownRootPropertyName } from "../exceptions";

export abstract class StateControllerBlueprint<State> {
    public propertyTitle: string;
    plugged: boolean = false;

    commandEntryPoint: command;
    rootSelector: () => State;


    constructor(propertyTitle: string) {
        this.propertyTitle = propertyTitle;
    }

    basePlugIn(
        commandEntryPoint: command,
        rootSelector: () => State,
    ) {
        this.commandEntryPoint = commandEntryPoint;
        this.rootSelector = () => {
            const controllerProperty = rootSelector()[this.propertyTitle];

            if (controllerProperty) {
                return controllerProperty;
            } else {
                throw StateControllerUnknownRootPropertyName(this.propertyTitle);
            }
        };

        this.plugged = true
    }

    isPlugged = () => {
        return this.plugged;
    }
}