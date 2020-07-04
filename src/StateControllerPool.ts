import { StateControllerPool, AnyStateController } from "../api_describtion/libraryApi";

export class ReduxStateControllerPool implements StateControllerPool {

    constructor(...stateControllers: AnyStateController[]) {
        // nothingYet
    }

    getControllerFor: (property: string) => null;
    makeReducer: () => null;
    plugIn: (reduxStore: any) => void;
}
