import { IStateController } from "../api_describtion/stateController";

export class ReduxStateController<State> implements IStateController<State> {
    constructor(
        propertyTitle: string,
        initial: State,
    ) {
        // Nothing yet
    }

    initial: () => null;
    
    set: (diff: Partial<State>) => void;
    reset: () => void;
    
    select: (propertyKey?: string) => null;
    queryKeys: () => [];

    makeReducer: () => null;
    plugIn: (dispatch: any) => void;
}
