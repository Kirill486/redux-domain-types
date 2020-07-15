import {IRecordStateController} from '../../api_describtion/recordStateController';
import { id, IRecordState } from '../../utils/definitions';
import { StateControllerBlueprint } from '../IExtendReduxApi/StateControllerBlueprint';
import { Store } from 'redux';
import { ReduxStateController } from '../StateController/StateController';
import { KeyDoesNotExistToDelete, RecordValueCannotBeUndefined, KeyYouReTryingToReachDoesNotExist } from '../exceptions';

export class ReduxRecordStateController<Record>
extends StateControllerBlueprint<IRecordState<Record>>
implements IRecordStateController<Record> {

    controller: ReduxStateController<IRecordState<Record>>;

    constructor(
        propertyTitle: string,
    ) {
        super(propertyTitle);

        const initialState: IRecordState<Record> = {};
        this.controller = new ReduxStateController(propertyTitle, initialState);
    }
    
    makeReducer = () => {
        return this.controller.makeReducer();
    };

    plugIn = (store: Store<any>) => {
        this.controller.plugIn(store);
        this.basePlugIn(store.dispatch, store.getState);
    };

    set = (id: id, data: Record) => {

        const recordPresent = ((typeof data) !== "undefined");

        if (recordPresent) {
            const state = this.controller.select();
            state[id] = data;
            const newState = {...state};
            this.controller.set(newState);
        } else {
            throw RecordValueCannotBeUndefined(id);
        }

        
    };

    delete = (id: id) => {
        const state = this.controller.select();

        const recordPresent = ((typeof state[id]) !== "undefined");

        if (recordPresent) {
            delete state[id];
            const newState = {...state};
            this.controller.set(newState);
        } else {
            throw KeyDoesNotExistToDelete(id);
        }        
    };

    select = (id?: id) => {

        if (id) {
            const state = this.controller.select();
            const targetRecord = state[id];

            const recordPresent = ((typeof targetRecord) !== "undefined");
            if (recordPresent) {
                return targetRecord;
            } else {
                throw KeyYouReTryingToReachDoesNotExist(id);
            }
        } else {
            return this.controller.select();
        }

        
    };
}