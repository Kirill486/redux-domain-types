# Redux Domain types

The easy to use map from buisiness-logic to model

## Initial intent

When we talk about a buisiness-application, it probably does one of this **use cases**:
- store **object with ptoperties**
- store **models** that have a sertain **Interface**

### Object with properties (StateController).

We can do set and reset to initial.
If we start using just redux, we end up with reducers, actions, when we actually need just

```Typescript
const diff: PartialAppState = {
    stateProperty1: 'stateProperty1Value',
    stateProperty2: 42,
    stateProperty3: true,
}

appStateController.set(diff);

appStateController.reset();
```
The ```redux``` is still underneath. You can use your favorite devtools, timetravel and middleware.

### Entity - thing that implements the DTO-like interface with the id property (StateController).

Here we want fast queries by some values and pointer safety.

#### Queries

```EntityStateController``` has a **complex state underneath**:

- dataState ```{[entityId]: Entity}```
- hashIndexesState(can be more then one) ```SearchTree<Hash: number, id[]>```
- dependentEntitiesState ```{dependentEntityId: id[]}```

**I case we want fast queries** - we provide EntityStateController with indexes.

Each index has a **hashFunction** underneath.
The arrays of entities that have the same hash result stored in [**SearchTree**](https://www.npmjs.com/package/functional-red-black-tree2).

When you **query range** - you have the ```Iterator``` for ***O(logn)*** and the rest of sequence for **constant time** each next.

#### Pointer safety and complex indexes

When we have connections between data, we often want to maintain pointer safety.
(WIP: [PointerResolve](https://github.com/Kirill486/redux-domain-types/issues/34))

## Run tests

```
npm install
npm test

```

You can run tests for **any part** of the project

```
npm run test_state
npm run test_record
npm run test_entity
npm run test_index
npm run test_pool
```

## Contribution guide

[Contribution guide](https://github.com/Kirill486/redux-domain-types/blob/master/contribution.md)
