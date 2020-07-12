import { IStateController } from "../../api_describtion/stateController";
import { Factory, Reducer, command } from "../../utils/definitions";
import { ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { ActionsController } from "./actions";
import { ReducerController } from "./reducer";

export class ReduxStateController<State> implements IStateController<State> {
    
    private propertyTitle: string;
    private actionsController: ActionsController<State>;
    private reducerController: ReducerController<State>;

    commandEntryPoint: command;

    initial = () => {
        return this.reducerController.initial();
    }
    
    set = (diff: Partial<State>) => {
        this.commandEntryPoint(this.actionsController.setAction(diff));
    }
    reset = () => this.commandEntryPoint(this.actionsController.resetAction());
    
    select = (propertyKey?: string) => null;
    queryKeys = () => [];

    makeReducer: Factory<ReducerMappedToProperty<State>> = () => {
        const reducer = this.reducerController.reducer;
        return {
            [this.propertyTitle]: reducer,
        };
    } 
    plugIn = (dispatch: any) => {
        this.commandEntryPoint = dispatch;
    };

    constructor(
        propertyTitle: string,
        initial: State,
    ) {
        this.propertyTitle = propertyTitle;

        this.actionsController = new ActionsController<State>(this.propertyTitle);
        const setActionType = this.actionsController.setAction().type;
        const resetActionType = this.actionsController.resetAction().type;

        this.reducerController = new ReducerController<State>(
            initial,
            setActionType,
            resetActionType,
        );
    }    
}
