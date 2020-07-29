import { ClientSelector } from "../../utils/definitions";
import { StateControllerUnknownPropertyNames, NoRootSelectorProvided } from "../exceptions";

const selectMultipleKeys = <Data>(state: Object, keys: string[]) => {
    const data = {};
    const misssingKeys = [];
    keys.forEach((queryKey) => {
        const keyExist = state.hasOwnProperty(queryKey);

        if (keyExist) {
            data[queryKey] = state[queryKey];
        } else {
            misssingKeys.push(queryKey);
        }
    });

    if (misssingKeys.length !== 0) {
        throw StateControllerUnknownPropertyNames(misssingKeys);
    } else {
        return data as Partial<Data>;
    }
}

export class SelectorController<ControllerState> {

    rootSelector: ClientSelector<ControllerState>;

    public select: ClientSelector<Partial<ControllerState>> = (propertyKey?: string | string[]) => {
        const propertyState = this.rootSelector();

        if (!propertyKey) {
            // select whole state
            return propertyState;
        } else {
            let keys: string[] = [];
            const isMultipleKeys = Array.isArray(propertyKey);

            if (isMultipleKeys) {
                keys = propertyKey as string[];
            } else {
                keys = [propertyKey as string]
            }

            const selectedFromState = selectMultipleKeys(propertyState, keys);
            return selectedFromState;
        }
    }

    constructor(
        rootSelector: ClientSelector<ControllerState>,
    ) {
        const isRootSelector =
            rootSelector &&
            (typeof rootSelector === "function");
        if ( isRootSelector ) {
            this.rootSelector = rootSelector;
        } else {
            throw NoRootSelectorProvided();
        }

    }
}