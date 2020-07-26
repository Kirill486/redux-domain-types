import { command, ClientSelector, id } from '../utils/definitions';
import { IExtendReduxAPI } from './libraryApi';

export type hash = number;
export type entities = id[];

export interface IndexDto {
    hash: hash;
    entities: entities;
}

export interface IIndexStateInstanceController {
}

export interface IIndexStateCommandController {
    add: command;
    remove: command;
}

export interface IIndexStateQueryController {
    select: ClientSelector<entities>;
    includes: ClientSelector<boolean>;
}

export interface IIndexStateController extends
IIndexStateInstanceController,
IIndexStateCommandController,
IIndexStateQueryController,
IExtendReduxAPI<any> {}
