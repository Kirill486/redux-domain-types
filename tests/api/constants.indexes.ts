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

export const titleHash: HashCode<IProduct> = (product) => {
    return getStringHash(product.title);
}

export const valueHash: HashCode<IProduct> = (product) => {
    return product.value;
}

export const titleIndex: HashIndex<IProduct> = {
    indexKey: ProductIndexKeys.title,
    index: titleHash,
}

export const valueIndex: HashIndex<IProduct> = {
    indexKey: ProductIndexKeys.value,
    index: valueHash,
}

export const costIndex: HashIndex<IPosition> = {
    indexKey: PositionIndexKeys.cost,
    index: null,
}
export const productIndex: HashIndex<IPosition> = {
    indexKey: PositionIndexKeys.product,
    index: null,
};
export const wishListPosition: HashIndex<IPosition> = {
    indexKey: PositionIndexKeys.whishList,
    index: null,
};
