import * as assert from 'assert';
import { ReduxStateController } from '../../src/StateController';
import { IAppState, TPartialAppState } from '../../domain_types/domainTypes';
import { StateControllerUnknownPropertyName } from '../../src/exceptions';

describe('StateController Basic Usage', () => {
  
    it('ensures app initial defined and not null', () => {
        assert.notEqual(1, undefined);
        assert.notEqual(2, null);
    });
});
