# Redux Domain types

## Plan

1. API description
2. Tests
3. Green tests
4. Documentation
5. More tests

## API description.

- we provide entity of a domain type
- we get reducer and crud action creators

## Pre

We write a regular reducer that provide the discribed API to have both code tested at once.

# API Description

So we have different levels of *something*. (modal sanity?)

I.  store responds to the set_state and reset_state action (whole state *something*)
II. store responds to the set_entity and reset_entity action (entity level *something*)
III. CRUD entity

So, we have different levels of indexes:

I. none (indexes itself)
II. all kesy index (we can query all)
III. Index by hashCodes. (rande or flag)

HashCode = (entity: IEntity) => number | boolean;

CommonInddex = {
  indexKey: string,
  index: HashCode,
}

IV. BuisinessLogicIndexes

BuisinessIndex = {
  indexKey:
  index: number | boolean 
}

V. Data Structures

List (insert, reorder, removeFromList, removeWithData)
Domain types provide link safety out of the box (nothing points to undefined)

Set (add removeFromSet removeWithData)
