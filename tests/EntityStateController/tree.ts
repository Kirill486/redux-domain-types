import * as assert from 'assert';
import {} from 'functional-red-black-tree';

// Here we have our tree tested.
// It should return pointer to the first element that satisfy query fast
// And then return elements even faster

// Pre:

// I definitely need my tree typed)

// So how we do that:

// 1. Generate big dataset (10^6 or bigger);
// 2. Create test object on dataset
// 3. Create array on dataset;
// 4. Create a serch tree on hashFunction.

// We measure:

// * creation time
// * search for a single element by id
// * search for a single element by query
// * search for a query
