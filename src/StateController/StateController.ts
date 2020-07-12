import { IStateController } from "../../api_describtion/stateController";
import { Factory, Reducer, command } from "../../utils/definitions";
import { ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { ActionsController } from "./actions";
import { ReducerController } from "./reducer";
import { Store } from "redux";
import { StateControllerUnknownRootPropertyName } from "../exceptions";
import { SelectorController } from "./selectors";

export class ReduxStateController<State> implements IStateController<State> {
    
    public propertyTitle: string;
    private actionsController: ActionsController<State>;
    private reducerController: ReducerController<State>;
    private selectController: SelectorController<State>;

    commandEntryPoint: command;
    
    rootSelector: () => State;

    initial = () => {
        return this.reducerController.initial();
    }
    
    set = (diff: Partial<State>) => {
        this.commandEntryPoint(this.actionsController.setAction(diff));
    }
    reset = () => this.commandEntryPoint(this.actionsController.resetAction());
    
    select = (propertyKey?: string | string[]) => null;
    queryKeys = () => [];

    makeReducer: Factory<ReducerMappedToProperty<State>> = () => {
        const reducer = this.reducerController.reducer;
        return {
            [this.propertyTitle]: reducer,
        };
    } 
    plugIn = ({dispatch, getState}: Store<any>) => {
        this.commandEntryPoint = dispatch;
        this.rootSelector = () => {
            const controllerProperty = getState()[this.propertyTitle];

            if (controllerProperty) {
                return controllerProperty;
            } else {
                throw StateControllerUnknownRootPropertyName(this.propertyTitle);
            }
        }
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

        this.selectController = new SelectorController<State>(this.rootSelector);
    }
}
