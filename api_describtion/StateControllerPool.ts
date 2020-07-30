// State Controller Pool does
// * complex indexes (it provides a selector by id to inner controllers)
// * pointer safety (deletes links that point to undefined)

import { IExtendReduxAPI, AnyStateController } from "./libraryApi";

export interface StateControllerPool extends IExtendReduxAPI<any> {
    getControllerFor: (property: string) => AnyStateController;
    readonly controllersKeys: string[];
    readonly entityControllersKeys: string[];
}
