import { initialize, StatePropertyNames } from "./constants";
import { ReduxEntityStateController } from "../../src";
import { IProduct } from "../../domain_types/domainTypes";
import * as assert from 'assert';
import {IRecord, id} from "../../utils/definitions";

describe('EntityStateController Basic Usage', () => {
    it('initial state is defined and not null', () => {
        const {store, ApplicationStateControllerPool} = initialize();
        const productStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.product) as ReduxEntityStateController<IProduct>;

        const productsInitial = productStateController.query();
        assert.notEqual(productsInitial, undefined);
        assert.notEqual(productsInitial, null);
    });

    it('initial query returns empty array', () => {
        const {store, ApplicationStateControllerPool} = initialize();
        const productStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.product) as ReduxEntityStateController<IProduct>;

        const productsInitial = productStateController.query();
        assert.equal(Array.isArray(productsInitial), true);
        assert.equal(productsInitial.length, 0);
    });

    it('add entity with no arguments (uses incapsulated facytory)', () => {
        const {store, ApplicationStateControllerPool} = initialize();
        const productStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.product) as ReduxEntityStateController<IProduct>;

        const factoryEntity: IProduct = productStateController.factory();

        productStateController.add();

        const entities: IRecord<IProduct>[] = productStateController.query();

        assert.equal(entities.length, 1);

        const autocreatedRecord: IRecord<IProduct> = entities[0];

        assert.equal(autocreatedRecord.title, factoryEntity.title);
        assert.equal(autocreatedRecord.description, factoryEntity.description);
        assert.equal(autocreatedRecord.value, factoryEntity.value);

        assert.notEqual(autocreatedRecord, factoryEntity);
    });

    it('add entity with arguments (check data consistensy)', () => {
        const {store, ApplicationStateControllerPool} = initialize();
        const productStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.product) as ReduxEntityStateController<IProduct>;

        const newProduct: IProduct = {
            title: '123456789',
            description: '123',
            value: 100,
        }

        productStateController.add(newProduct);

        const entities: IRecord<IProduct>[] = productStateController.query();

        assert.equal(entities.length, 1);

        const autocreatedRecord: IRecord<IProduct> = entities[0];

        assert.equal(autocreatedRecord.title, newProduct.title);
        assert.equal(autocreatedRecord.description, newProduct.description);
        assert.equal(autocreatedRecord.value, newProduct.value);

        assert.notEqual(autocreatedRecord, newProduct);
    });

    it('added entity selected by the key', () => {
        const {store, ApplicationStateControllerPool} = initialize();
        const productStateController = ApplicationStateControllerPool.getControllerFor(StatePropertyNames.product) as ReduxEntityStateController<IProduct>;

        const newProduct: IProduct = {
            title: '123456789',
            description: '123',
            value: 100,
        }

        productStateController.add(newProduct);

        const ids: id[] = productStateController.query().map((item: IRecord<IProduct>) => item.id);
        
        assert.equal(ids.length, 1);
        const entity = productStateController.select(null, ids[0]);
    });

    it('added entity instance has a key', () => {
        
    });

    it('added entity instance has a key', () => {
        
    });

    it('added entity instance appeared in query all', () => {
        
    });
});