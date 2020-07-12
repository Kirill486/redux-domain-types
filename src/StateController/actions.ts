import { ActionCreator } from "redux";
import { IActionOfType, IAction } from "../../utils/definitions";

export class ActionsController<State> {
    static stateControllerPrefix = 'state_controller_action_prefix';
    static wholeStateActionTypes = {
        SET: 'SET',
        RESET: 'RESET',
    };

    public setAction: ActionCreator<IAction<State>>;
    public resetAction: ActionCreator<IAction<undefined>>;

    constructor(propertyKey: string) {
        const actionTypes = Object.freeze({
            set: `${propertyKey}_${ActionsController.stateControllerPrefix}_${ActionsController.wholeStateActionTypes.SET}`,
            reset: `${propertyKey}_${ActionsController.stateControllerPrefix}_${ActionsController.wholeStateActionTypes.RESET}`,
        });

        this.setAction = (state: State) => ({
            type: actionTypes.set,
            payload: state,
        });
    
        this.resetAction = () => ({
            type: actionTypes.reset,
            payload: undefined,
        });
    }
};
