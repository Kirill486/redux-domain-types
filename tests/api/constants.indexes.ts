import { HashIndex, HashCode, id } from "../../utils/definitions";
import { IProduct, IPosition } from "../../domain_types/domainTypes";
import { getStringHash } from "../../utils/getStringHash";

const postfix = 'index_123';

export const ProductIndexKeys = Object.freeze({
    title: `title_${postfix}`,
    value: `value_${postfix}`,
});

export const PositionIndexKeys = Object.freeze({
    cost: `cost_${postfix}`,
    product: `product_${postfix}`,
    whishList: `whishList_${postfix}`,
});

export const titleHash: HashCode<IProduct, number> = (product) => {
    return getStringHash(product.title);
}

export const valueHash: HashCode<IProduct, number> = (product) => {
    return product.value;
}

export const titleIndex: HashIndex<IProduct, number> = {
    indexKey: ProductIndexKeys.title,
    index: titleHash,
}

export const valueIndex: HashIndex<IProduct, number> = {
    indexKey: ProductIndexKeys.value,
    index: valueHash,
}

export const costIndex: HashIndex<IPosition, number> = {
    indexKey: PositionIndexKeys.cost,
    index: null,
}
export const productIndex: HashIndex<IPosition, id> = {
    indexKey: PositionIndexKeys.product,
    index: null,
};
export const wishListPosition: HashIndex<IPosition, boolean> = {
    indexKey: PositionIndexKeys.whishList,
    index: null,
};
