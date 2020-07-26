import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";
import {IIndexStateController, hash} from '../../api_describtion/indexStateController';
import { id } from "../../utils/definitions";

export class IndexStateController
extends StateControllerBlueprint<any>
implements IIndexStateController {

    constructor(propertyTitle) {
        super(propertyTitle);
    }

    makeReducerInner = () => null;

    add = (hash: hash, ids: id[]) => undefined;
    remove = (hash: hash, ids: id[]) => undefined;

    select = (hashFrom: hash, hashTo: hash) => ["42"];
    includes = () => false;
}