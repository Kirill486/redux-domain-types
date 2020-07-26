import { command, ClientSelector, id } from '../utils/definitions';
import { IExtendReduxAPI } from './libraryApi';

export type hash = number;

export interface IIndexStateInstanceController {
}

export interface IIndexStateCommandController {
    add: command;
    remove: command;
}

export interface IIndexStateQueryController {
    select: ClientSelector<id[]>;
    includes: ClientSelector<boolean>;
}

export interface IIndexStateController extends
IIndexStateInstanceController,
IIndexStateCommandController,
IIndexStateQueryController,
IExtendReduxAPI<any> {}
