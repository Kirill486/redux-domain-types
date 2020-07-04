import { ClientSelector, command, id } from "../utils/definitions";

export interface IStateInstanceController<State> {
    initial: ClientSelector<State>;
}

export interface IStateCommandController<State> {
    set: command;
    reset: command;
}

export interface IStateQueryController<State> {
    select: ClientSelector<Partial<State>>;
    queryKeys: ClientSelector<id[]>;
}

export interface IStateController<State> extends
IStateInstanceController<State>,
IStateCommandController<State>,
IStateQueryController<State> {}
