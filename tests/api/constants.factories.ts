import {v4 as uuid} from 'uuid';
import { IEntityFactoryMethod } from '../../src/EntityStateController/types';
import { Factory, IEntity } from "../../utils/definitions";
import { IProduct, IPosition } from "../../domain_types/domainTypes";

const productFactory: Factory<IEntity<IProduct>> = (title, description, value) => ({
    id: uuid(),
    title,
    description,
    value,
});

export const productFactoryMethod: IEntityFactoryMethod<IEntity<IProduct>> = {
    factory: productFactory,
    linkedProperties: [],
};

const positionFactory: Factory<IEntity<IPosition>> = (productId, amount = 1) => ({
    id: uuid(),
    product: productId,
    amount: amount,
})

export const positionFactoryMethod: IEntityFactoryMethod<IEntity<IPosition>> = {
    factory: positionFactory,
    linkedProperties: ["product"],
};
