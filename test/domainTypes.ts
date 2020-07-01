export interface IProduct {
    title: string;
    value: number;
    description: string;
}

export interface IPosition {
    product: IProduct;
    amount: number;
}

export type TChart = Set<IPosition>;
