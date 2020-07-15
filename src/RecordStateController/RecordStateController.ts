import {IRecordStateController} from '../../api_describtion/recordStateController';
import { command, ClientSelector, id, Factory, IRecordState } from '../../utils/definitions';
import { StateControllerBlueprint } from '../IExtendReduxApi/StateControllerBlueprint';
import { Store } from 'redux';

export class ReduxRecordStateController<Record>
extends StateControllerBlueprint<IRecordState<Record>>
implements IRecordStateController<Record> {
    
    constructor(
        propertyTitle: string,
        recordFactory: Factory<Record>,
    ) {
        super(propertyTitle);

        // add checks that factory does not return undefined
        // use null instead
        this.fabric = recordFactory;
    }
    
    fabric = () => null;

    makeReducer = () => null;
    plugIn = ({dispatch, getState}: Store<any>) => {
        this.basePlugIn(dispatch, getState);
    };

    set: command;
    delete: command;

    select: ClientSelector<Record>;
    queryKeys: ClientSelector<id[]>;
}