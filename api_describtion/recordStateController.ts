import {command, ClientSelector, id, Factory, IRecordState} from '../utils/definitions';
import {IExtendReduxAPI} from './libraryApi';

export interface IRecordStateInstanceController<Record> {
    fabric: Factory<Record>;
}

export interface IRecordStateCommandController<Record> {
    set: command;
    delete: command;
}

export interface IRecordStateQueryController<Record> {
    select: ClientSelector<Record>;
    queryKeys: ClientSelector<id[]>;
}

export interface IRecordStateController<Record> extends
IRecordStateInstanceController<Record>,
IRecordStateCommandController<Record>,
IRecordStateQueryController<Record>,
IExtendReduxAPI<IRecordState<Record>> {}
