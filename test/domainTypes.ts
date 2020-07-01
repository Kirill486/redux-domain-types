export interface IProduct {
    title: string;
    value: number;
    description: string;
}

export interface IPosition {
    product: IProduct;
    amount: number;
}

export interface IAppState {
    modalOpen: boolean;
    isLoading: boolean;

    errors: any[];
}