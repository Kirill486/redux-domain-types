import { command, ClientSelector } from "../src/definitions";

export interface IStateInstanceController<State> {
    initial: ClientSelector<State>;
}

export interface IStateCommandController<State> {
    set: command;
    reset: command;
}

export interface IStateQueryController<State> {
    select: ClientSelector<Partial<State>>;
}

export interface IStateController<State> extends
IStateInstanceController<State>,
IStateCommandController<State>,
IStateQueryController<State> {}
