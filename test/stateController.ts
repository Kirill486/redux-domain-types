import { command, ClientSelector, id, HashIndex } from "../src/definitions";

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

export type TStateControllerProvider<State> =
new (
    propertyTitle: string,
    initial: State,
) => IStateController<State>;
