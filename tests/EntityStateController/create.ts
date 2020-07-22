import * as assert from 'assert';

import { initializeStoreWithProductStateController, initializeStoreWithProductStateControllerAndData } from "../api/constants";
import { ReduxEntityStateController } from '../../src';
import { IProduct } from '../../domain_types/domainTypes';
import { IEntity } from '../../utils/definitions';

describe('EntityStateController adds entities', () => {
    
    it('can create produs', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        controller.add();

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const propertyDataKeysLength = Object.keys(propertyData).length
        assert.ok(propertyDataKeysLength === 1);
    });

    it('created by default produs have props we need', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        controller.add();

        const emptyProduct: IEntity<IProduct> = controller.factory();

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const propertyDataKey = Object.keys(propertyData)[0];
        assert.ok(propertyDataKey);
        const data: IEntity<IProduct> = propertyData[propertyDataKey];

        // except ids
        delete data.id;
        delete emptyProduct.id;
        assert.deepEqual(data, emptyProduct);
    });

    it('can create produs from domain type', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const newProd: IProduct = {
            title: 'prod1',
            description: 'descr1',
            value: 42,
        }
        
        controller.add(newProd);

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const propertyDataKeysLength = Object.keys(propertyData).length
        assert.ok(propertyDataKeysLength === 1);

    });

    it('created from domain type record has id anyway', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const newProd: IProduct = {
            title: 'prod1',
            description: 'descr1',
            value: 42,
        }
        
        controller.add(newProd);

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const prodKey = Object.keys(propertyData)[0];

        const record = propertyData[prodKey];
        assert.ok(record);
        assert.ok(record.id);
    });

    it('created from domain type record has properties set', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const newProd: IProduct = {
            title: 'prod1',
            description: 'descr1',
            value: 42,
        }
        
        controller.add(newProd);

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const prodKey = Object.keys(propertyData)[0];

        const {
            title: stateProperyTitle,
            description: stateProperyDescription,
            value: statePropertyValue,
        }: IEntity<IProduct> = propertyData[prodKey];

        const {title, description, value} = newProd;
        assert.ok(title === stateProperyTitle);
        assert.ok(description === stateProperyDescription);
        assert.ok(value === statePropertyValue);
    });

    it('can add full entity', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const newProd: IEntity<IProduct> = {
            id: '42',
            title: 'prod1',
            description: 'descr1',
            value: 42,
        };
        controller.add(newProd);

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const prod = propertyData[newProd.id];
        
        const {
            id: statePropertyId,
            title: stateProperyTitle,
            description: stateProperyDescription,
            value: statePropertyValue,
        }: IEntity<IProduct> = prod;

        const {id, title, description, value} = newProd;
        assert.ok(id === statePropertyId);
        assert.ok(title === stateProperyTitle);
        assert.ok(description === stateProperyDescription);
        assert.ok(value === statePropertyValue);
    });

    it('can bulk add entities', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        const newProd1: IEntity<IProduct> = {
            id: '42',
            title: 'prod1',
            description: 'descr1',
            value: 42,
        };
        const newProd2: IEntity<IProduct> = {
            id: '422',
            title: '2prod12',
            description: '2descr12',
            value: 242,
        };
        controller.add([newProd1, newProd2]);

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const dataKeys = Object.keys(propertyData);

        assert.ok(dataKeys.length === 2);

        dataKeys.forEach((dataKey) => {
            const entity = propertyData[dataKey];
            assert.ok(entity);
            assert.ok(entity.id);
        })
    });

    it('throws on attempt to create record with id that exist', () => {
        const {store, prods, controller} = initializeStoreWithProductStateControllerAndData();
        const prod = prods[0];

        try {
            controller.add(prod);
            assert.ok(false)
        } catch(e) {
            assert.ok(e);
            const {message} = e as Error;
            assert.ok(message);

            const idIMentioned = message.includes(prod.id);
            assert.ok(idIMentioned);
        }
    });

});
