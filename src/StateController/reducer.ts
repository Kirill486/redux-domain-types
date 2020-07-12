import { Reducer, IAction, Factory } from "../../utils/definitions";

export class ReducerController<State> {
    public reducer: Reducer<State>;
    public initial: Factory<State>;

    initialState: State;

    constructor(
        initialState: State,
        setActionType: string,
        resetActionType: string,
    ) {
        this.initialState = initialState;
        this.initial = () => ({
            ...this.initialState,
        });
        
        
        const reducer: Reducer<State> = (
            state: State,
            action: IAction<any>
        ) => {
            if (typeof state === "undefined") {
                state = this.initial();
            }
            switch (action.type) {
                case setActionType: {
                    const {payload} = action as IAction<Partial<State>>;
                    return {
                        ...state,
                        ...payload,
                    }
                }
                case resetActionType: {
                    return {
                        ...this.initial(),
                    }
                }
                default: {
                   return {
                       ...state,
                   };
                }
            }
        }        

        this.reducer = reducer;
    }
}