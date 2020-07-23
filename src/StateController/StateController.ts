import { IStateController } from "../../api_describtion/stateController";
import { Factory, Reducer } from "../../utils/definitions";
import { ActionsController } from "./actions";
import { ReducerController } from "./reducer";
import { UnpluggedControllerOperation } from "../exceptions";
import { SelectorController } from "./selectors";
import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";

export class ReduxStateController<State>
extends StateControllerBlueprint<State>
implements IStateController<State> {
    
    public propertyTitle: string;
    private actionsController: ActionsController<State>;
    private reducerController: ReducerController<State>;
    private selectController: SelectorController<State>;

    plugged: boolean = false;

    initial = () => {
        return this.reducerController.initial();
    }
    
    set = (diff: Partial<State>) => {
        if (this.isPlugged()) {
            this.commandEntryPoint(this.actionsController.setAction(diff));
        } else {
            throw UnpluggedControllerOperation(this.propertyTitle);
        }
        
    }
    reset = () => {
        if (this.isPlugged()) {
            this.commandEntryPoint(this.actionsController.resetAction());
        } else {
            throw UnpluggedControllerOperation(this.propertyTitle);
        }
        
    } 
    
    select = (propertyKey?: string | string[]) => {
        if (this.isPlugged()) {
            return this.selectController.select(propertyKey);
        } else {
            throw UnpluggedControllerOperation(this.propertyTitle);
        }
    }

    makeReducerInner: Factory<Reducer<State>> = () => {
        const {reducer} = this.reducerController;
        return reducer;
    }

    afterPlugIn = () => {
        this.selectController = new SelectorController<State>(this.rootSelector);
    }

    constructor(
        properyTitle: string,
        initial: State,
    ) {
        super(properyTitle);

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
