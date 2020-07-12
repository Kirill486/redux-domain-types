import { IStateController } from "../api_describtion/stateController";
import { Factory, Reducer } from "../utils/definitions";
import { ReducerMappedToProperty } from "../api_describtion/libraryApi";

export class ReduxStateController<State> implements IStateController<State> {
    
    private propertyTitle: string;
    private inirialState: State;
    
    initial = () => {
        return {
            ...this.inirialState,
        }
    };
    
    set = (diff: Partial<State>) => undefined;
    reset = () => undefined;
    
    select = (propertyKey?: string) => null;
    queryKeys = () => [];

    makeReducer: Factory<ReducerMappedToProperty<State>> = () => {
        const reducer = () => {
            return this.initial();
        };
        return {
            [this.propertyTitle]: reducer,
        };
    } 
    plugIn = (dispatch: any) => undefined;

    constructor(
        propertyTitle: string,
        initial: State,
    ) {
        this.inirialState = initial;
        this.propertyTitle = propertyTitle;
    }    
}
