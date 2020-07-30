// State Controller Pool does
// * complex indexes (it provides a selector by id to inner controllers)
// * pointer safety (deletes links that point to undefined)

import { IExtendReduxAPI, AnyStateController } from "./libraryApi";

export interface StateControllerPool extends IExtendReduxAPI<any> {
    getControllerFor: (property: string) => AnyStateController;
    readonly controllersKeys: string[];

    readonly entityControllersKeys: string[];
    readonly stateControllersKeys: string[];

    // Find and recalculate depending indexes (for entity controllers)
    entityChanged: (propertyTitle: string, id) => void;

    // FInd and recalculate dependent indexes (for state controllers)
    stateChanged: (propertyTitle: string) => void;
}
