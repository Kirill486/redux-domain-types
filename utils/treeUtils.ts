import { ITree, FunctionCompatator } from "search-tree/dist/libraryDefinitions";
import { INode } from "search-tree/libraryDefinitions";
import { defaultCompare, createRBTree, RedBlackTree } from "search-tree";
import { deepClone } from "./deepClone";

// different instance we test it
export const serilizeTree = <ValueType>(tree: ITree<ValueType>): INode<ValueType> => {
    const innerTree = tree.root;
    return deepClone(innerTree);
}

// deserilize tree
export const deserilizeTree = <ValueType>(innerTree: INode<ValueType>, compare?: FunctionCompatator): ITree<ValueType> => {
    const comparator = compare || defaultCompare;
    const tree = new RedBlackTree(comparator, innerTree);
    return tree;
}