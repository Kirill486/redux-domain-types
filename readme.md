# Redux Domain types

We describbe our API in ```src/index```. Not actual tests yet. Just the way we would use the perfect model implementation.

Get me right here!!! 
The ```redux-domain-types``` is the model implementation. You ***must not*** write buisiness-logic here.
It's just a fancy in-memory data storage with synckrosyty, time travel and blackjack))) To help all humans)

For buisiness-logic layer inplementation I would recommend ```redux-saga```. It does the job well.
Even too well. You can literally **translaate** well-written buisiness requiriments into code.
It has great documentation, so check it out, it's really excyting reading)

## Folder Structure

```api-description``` - a place to store high-level client definitions like what is State controller, what it does, haw to create one. The idea you can get from ```api-description/index```.

```tests``` - this will proof the api described

```src``` - we will write modules implementation.

## Installation & Run

Yet you can not. (**See work order**)

## Work order

1. Finish describing API. How it all starts (StateControllerPool) ```() =>store```. <<<<- **we here**
2. Write Usage with ```redux-saga``` part.
3. Write red tests and the ```Installation & Run``` part).
