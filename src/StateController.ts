import { IStateController } from "../api_describtion/stateController";

export class ReduxStateController<State> implements IStateController<State> {
    
    initial = () => null;
    
    set = (diff: Partial<State>) => undefined;
    reset = () => undefined;
    
    select = (propertyKey?: string) => null;
    queryKeys = () => [];

    makeReducer = () => null;
    plugIn = (dispatch: any) => undefined;

    constructor(
        propertyTitle: string,
        initial: State,
    ) {
    }    
}
