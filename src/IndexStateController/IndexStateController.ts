import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";
import {IIndexStateController, hash, entities} from '../../api_describtion/indexStateController';
import { id } from "../../utils/definitions";
import { RedBlackTree, defaultCompare } from 'search-tree';
import { ReduxStateController } from "..";
import { deepClone } from "../../utils/deepClone";
import { INode } from "search-tree/dist/libraryDefinitions";

export type IndexInnerTreeType = INode<entities> | null;

export class IndexStateController
extends StateControllerBlueprint<IndexInnerTreeType>
implements IIndexStateController {

    controller: ReduxStateController<IndexInnerTreeType>;

    constructor(propertyTitle) {
        super(propertyTitle);

        this.controller = new ReduxStateController<IndexInnerTreeType>(this.propertyTitle, null);
    }

    get InnerTreeCopy(): IndexInnerTreeType {
        return deepClone(this.controller.select() as INode<entities>);
    }

    get InnerTreePointer(): IndexInnerTreeType {
        return this.controller.select() as INode<entities>;
    }

    makeReducerInner = () => {
        return this.controller.makeReducerInner();
    };

    add = (hash: hash, ids: id[]) => {
        let tree = new RedBlackTree<entities>(defaultCompare, this.InnerTreeCopy);
        const iterator = tree.find(hash);
        if (iterator) {
            const {value} = iterator;
            tree = iterator.update([...value, ...ids]);
        }
        const nextInnerTree = tree.root;
        this.controller.set(nextInnerTree);        
    };
    remove = (hash: hash, ids: id[]) => {
        let tree = new RedBlackTree<entities>(defaultCompare, this.InnerTreeCopy);
        const iterator = tree.find(hash);

        if (iterator) {
            const { value } = iterator;
            const nextValue = value.reduce((accumulator, item)  => {
                if (!ids.includes(item)) {
                    accumulator.push(item)
                }
                return accumulator;
            }, []);
            tree = iterator.update(nextValue);
            const nextInnerTree = tree.root;
            this.controller.set(nextInnerTree);
        }
    };

    select = (hashFrom?: hash, hashTo?: hash) => {
        const tree = new RedBlackTree<entities>(defaultCompare, this.InnerTreePointer);
        const iterator = tree.begin;
        const result: entities = [];
        while (iterator.hasNext) {
            iterator.next();
            const entities = iterator.value;

            entities.forEach((id: id) => result.push(id));
        }

        return result;
    };

    includes = (hash: hash) => {
        const tree = new RedBlackTree<entities>(defaultCompare, this.InnerTreePointer);
        const iterator = tree.find(hash);
        return iterator.valid;
    };
}