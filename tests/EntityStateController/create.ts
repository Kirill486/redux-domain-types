import * as assert from 'assert';

import { initializeStoreWithProductStateController } from "../api/constants";
import { ReduxEntityStateController } from '../../src';
import { IProduct } from '../../domain_types/domainTypes';
import { IEntity } from '../../utils/definitions';

describe('EntityStateController stores data', () => {
    
    it('can create produs', () => {
        const {store, controller} = initializeStoreWithProductStateController();
        controller.add();

        const propertyData: object = store.getState()[controller.propertyTitle][ReduxEntityStateController.dataPrefix];
        const propertyDataKeysLength = Object.keys(propertyData).length
        assert.ok(propertyDataKeysLength === 1);
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
});
