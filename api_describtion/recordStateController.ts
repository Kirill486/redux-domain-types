import {command, ClientSelector, IRecordState} from '../utils/definitions';
import {IExtendReduxAPI} from './libraryApi';

export interface IRecordStateCommandController<Record> {
    set: command;
    delete: command;

    bulkSet: command;
    bulkDelete: command;
}

export interface IRecordStateQueryController<Record> {
    select: ClientSelector<Record | IRecordState<Record>>;
    includes: ClientSelector<boolean>;
}

export interface IRecordStateController<Record> extends
IRecordStateCommandController<Record>,
IRecordStateQueryController<Record>,
IExtendReduxAPI<IRecordState<Record>> {}
