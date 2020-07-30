import { AnyStateController } from "../../api_describtion/libraryApi";
import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";
import { StateControllerPool } from "../../api_describtion/StateControllerPool";

export class ReduxStateControllerPool extends StateControllerBlueprint<any> implements StateControllerPool {
    constructor(
        properyTitle: string,
        ...stateControllers: AnyStateController[]
    ) {
        super(properyTitle);
        // nothingYet
    }

    get controllersKeys() {
        return [] as string[];
    };

    get entityControllersKeys() {
        return [] as string[];
    }

    get stateControllersKeys() {
        return [] as string[];
    }

    makeReducerInner: () => null;

    getControllerFor: (property: string) => null;

}
