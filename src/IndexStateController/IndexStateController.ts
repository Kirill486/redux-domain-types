import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";
import {IIndexStateController} from '../../api_describtion/indexStateController';

export class IndexStateController
extends StateControllerBlueprint<any>
implements IIndexStateController {

    constructor(propertyTitle) {
        super(propertyTitle);
    }

    makeReducerInner = () => null;

    add = () => undefined;
    remove = () => undefined;
    select = () => [42];
    includes = () => undefined;
}