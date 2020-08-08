import * as assert from 'assert';
import { initializeControllerPool } from "../api/constants.pool";
import { StatePropertyNames } from "../api/constants";
import { ReduxStateController, ReduxEntityStateController } from "../../src";
import { IAppState, IProduct } from '../../domain_types/domainTypes';

describe('ControllerPool has inner stored controllers', () => {

    it('returns us state controllers', () => {
        const controllerPool = initializeControllerPool();
        const stateController = controllerPool.getControllerFor(StatePropertyNames.app) as any;

        assert.ok(stateController instanceof ReduxStateController);
        assert.ok((stateController as ReduxStateController<IAppState>).propertyTitle === StatePropertyNames.app)
    });

    it('returns us entity controller', () => {
        const controllerPool = initializeControllerPool();
        const productStateController = controllerPool.getControllerFor(StatePropertyNames.product) as any;

        assert.ok(productStateController instanceof ReduxEntityStateController);
        assert.ok((productStateController as ReduxEntityStateController<IProduct>).propertyTitle === StatePropertyNames.product)
    });
});
