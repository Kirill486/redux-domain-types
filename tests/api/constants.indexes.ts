import { HashIndex, HashCode, id, IEntity } from "../../utils/definitions";
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

const costHash: HashCode<IPosition> = (position, getById) => {
    const correspondingProduct: IProduct = getById(position.product);
    if (correspondingProduct) {
        return position.amount * correspondingProduct.value;
    } else {
        // It is buisiness-logic exception
        // tslint:disable-next-line: no-string-throw
        throw "Pointer to undefined exception";
    }
}

export const costIndex: HashIndex<IPosition> = {
    indexKey: PositionIndexKeys.cost,
    index: costHash,
}

const productHash: HashCode<IPosition> = (position, getById) => {
    const correspondingProduct: IEntity<IProduct> = getById(position.product);
    if (correspondingProduct) {
        return getStringHash(correspondingProduct.id);
    } else {
        // It is buisiness-logic exception
        // tslint:disable-next-line: no-string-throw
        throw "Pointer to undefined exception";
    }
}

export const productIndex: HashIndex<IPosition> = {
    indexKey: PositionIndexKeys.product,
    index: productHash,
};

const getWishList = () => ['1', '2', '3'];

const wishListHash: HashCode<IPosition> = (position, getById) => {
    const list: id[] = getWishList();
    const correspondingProduct: IEntity<IProduct> = getById(position.product);

    if (correspondingProduct) {
        return list.includes(correspondingProduct.id) ? 1 : 0;
    } else {
        // It is buisiness-logic exception
        // tslint:disable-next-line: no-string-throw
        throw "Pointer to undefined exception";
    }
}

export const wishListPosition: HashIndex<IPosition> = {
    indexKey: PositionIndexKeys.whishList,
    index: wishListHash,
};
