import { IStateController } from "../../api_describtion/stateController";
import { Factory, Reducer, command } from "../../utils/definitions";
import { ReducerMappedToProperty } from "../../api_describtion/libraryApi";
import { ActionsController } from "./actions";
import { ReducerController } from "./reducer";
import { Store } from "redux";
import { StateControllerUnknownRootPropertyName, UnpluggedControllerOperation } from "../exceptions";
import { SelectorController } from "./selectors";

export class ReduxStateController<State> implements IStateController<State> {
    
    public properyTitle: string;
    private actionsController: ActionsController<State>;
    private reducerController: ReducerController<State>;
    private selectController: SelectorController<State>;

    plugged: boolean = false;

    commandEntryPoint: command;
    
    rootSelector: () => State;

    initial = () => {
        return this.reducerController.initial();
    }
    
    set = (diff: Partial<State>) => {
        if (this.isPlugged()) {
            this.commandEntryPoint(this.actionsController.setAction(diff));
        } else {
            throw UnpluggedControllerOperation(this.properyTitle);
        }
        
    }
    reset = () => {
        if (this.isPlugged()) {
            this.commandEntryPoint(this.actionsController.resetAction());
        } else {
            throw UnpluggedControllerOperation(this.properyTitle);
        }
        
    } 
    
    select = (propertyKey?: string | string[]) => {
        if (this.isPlugged()) {
            return this.selectController.select(propertyKey);
        } else {
            throw UnpluggedControllerOperation(this.properyTitle);
        }
    }
    // queryKeys = () => [];

    makeReducer: Factory<ReducerMappedToProperty<State>> = () => {
        const reducer = this.reducerController.reducer;
        return {
            [this.properyTitle]: reducer,
        };
    } 
    plugIn = ({dispatch, getState}: Store<any>) => {
        this.commandEntryPoint = dispatch;
        this.rootSelector = () => {
            const controllerProperty = getState()[this.properyTitle];

            if (controllerProperty) {
                return controllerProperty;
            } else {
                throw StateControllerUnknownRootPropertyName(this.properyTitle);
            }
        }

        this.selectController = new SelectorController<State>(this.rootSelector);
        this.plugged = true;
    };

    isPlugged = () => {
        return this.plugged;
    }

    constructor(
        properyTitle: string,
        initial: State,
    ) {
        this.properyTitle = properyTitle;

        this.actionsController = new ActionsController<State>(this.properyTitle);
        const setActionType = this.actionsController.setAction().type;
        const resetActionType = this.actionsController.resetAction().type;

        this.reducerController = new ReducerController<State>(
            initial,
            setActionType,
            resetActionType,
        );

        
    }
}
