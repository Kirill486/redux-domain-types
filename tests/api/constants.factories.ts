import {v4 as uuid} from 'uuid';
import { IEntityFactoryMethod } from '../../src/EntityStateController/types';
import { Factory, IEntity } from "../../utils/definitions";
import { IProduct, IPosition } from "../../domain_types/domainTypes";
import { StatePropertyNames } from './constants';

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
    amount,
})

export const positionFactoryMethod: IEntityFactoryMethod<IEntity<IPosition>> = {
    factory: positionFactory,
    linkedProperties: [
        {
            linkedKey: "product",
            lilnkedTo: StatePropertyNames.product
        },
    ],
};
