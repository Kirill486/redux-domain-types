import { id } from "../utils/definitions";

export interface IProduct {
    title: string;
    value: number;
    description: string;
}

export interface IPosition {
    product: id; // productId
    amount: number;
}

export interface IAppState {
    modalOpen: boolean;
    isLoading: boolean;

    manualOrder?: id[]; // positionId

    errors: any[];
}

export type TPartialAppState = Partial<IAppState>;
