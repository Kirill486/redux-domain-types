import { StateControllerBlueprint } from "../IExtendReduxApi/StateControllerBlueprint";
import {IIndexStateController, hash, entities} from '../../api_describtion/indexStateController';
import { id } from "../../utils/definitions";
import { RedBlackTree, defaultCompare } from 'functional-red-black-tree2';
import { ReduxStateController } from "..";
import { deepClone } from "../../utils/deepClone";
import { INode } from "functional-red-black-tree2/dist/libraryDefinitions";
import { RedBlackTreeIterator } from "functional-red-black-tree2/dist/rbtreeIterator";

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
        const innerTreeClone = deepClone(this.InnerTreePointer);
        return innerTreeClone;
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
        const {value} = iterator;

        if (value) {
            tree = iterator.update([...value, ...ids]);
        } else {
            tree = tree.insert(hash, ids);
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
        const result: entities = [];

        let iterator: RedBlackTreeIterator<entities>;

        if (hashFrom) {
            // Equal or greater (first in seq)
            iterator = tree.ge(hashFrom);
        } else {
            iterator = tree.begin;
        }

        while (iterator.hasNext) {
            iterator.next();

            const toConditionHit = hashTo && iterator.key > hashTo;
            if (toConditionHit) {
                break;
            }

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

    afterPlugIn = () => {
        this.controller.plugIn(this.commandEntryPoint, this.rootSelector);
    }
}