import { StateControllerPool, AnyStateController } from "../api_describtion/libraryApi";

export class ReduxStateControllerPool implements StateControllerPool {

    public propertyTitle: string;

    constructor(
        properyTitle: string,
        ...stateControllers: AnyStateController[]
    ) {
        // nothingYet
    }

    getControllerFor: (property: string) => null;

    // This make reducer - plugin logic definitely goes
    // to the common ancestor
    makeReducer: () => null;
    plugIn: (reduxStore: any) => undefined;
    isPlugged: () => false;
}
