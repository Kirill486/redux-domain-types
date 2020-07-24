import {IRecordStateController} from '../../api_describtion/recordStateController';
import { id, IRecordState } from '../../utils/definitions';
import { StateControllerBlueprint } from '../IExtendReduxApi/StateControllerBlueprint';
import { ReduxStateController } from '../StateController/StateController';
import { KeyDoesNotExistToDelete, RecordValueCannotBeUndefined, KeyYouReTryingToReachDoesNotExist, RecordKeyCannotBeUndefined } from '../exceptions';

export interface RecordDto<Record> {
    recordKey: id;
    record: Record;
}

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
    
    makeReducerInner = () => {
        return this.controller.makeReducerInner();
    };

    set = (id: id, data: Record) => {
        const recordDto: RecordDto<Record> = {
            recordKey: id,
            record: data,
        }
        this.bulkSet([recordDto]);        
    };

    bulkSet = (dto: Array<RecordDto<Record>>) => {
        const state = this.controller.select();

        dto.forEach(({recordKey, record}) => {
            const recordPresent = ((typeof record) !== "undefined");
            const keyPresent = ((typeof recordKey) === "string");

            if (!recordPresent) throw RecordValueCannotBeUndefined(recordKey);
            if (!keyPresent) throw RecordKeyCannotBeUndefined();
            
            if (recordPresent && keyPresent) {
                state[recordKey] = record;
            }
        });

        const newState = {...state};
        this.controller.set(newState);
    }

    delete = (id: id) => {
        this.bulkDelete([id]);
    };

    bulkDelete = (ids: id[]) => {
        const state = this.controller.select();
        ids.forEach((recordKey: string) => {
            const recordPresent = ((typeof state[recordKey]) !== "undefined");
            if (recordPresent) {
                delete state[recordKey];
                const newState = {...state};
                this.controller.set(newState);
            } else {
                throw KeyDoesNotExistToDelete(recordKey);
            }   
        });
    }

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

    afterPlugIn = () => {
        this.controller.plugIn(this.commandEntryPoint, this.rootSelector);
    }
}