import { StateControllerPool, AnyStateController } from "../api_describtion/libraryApi";
import { StateControllerBlueprint } from "./IExtendReduxApi/StateControllerBlueprint";

export class ReduxStateControllerPool extends StateControllerBlueprint<any> implements StateControllerPool {
    constructor(
        properyTitle: string,
        ...stateControllers: AnyStateController[]
    ) {
        super(properyTitle);
        // nothingYet
    }
    
    makeReducerInner: () => null;

    getControllerFor: (property: string) => null;

}
