# Buisiness logic

Our buisiness logic is a map from requiriments to **an** implementation.

# So, assume, we have a online shop.

Our domainTypes would be **product** and **position**
Our Use cases: **Initialize**, **AddPositionToChart**, **ChangeAmountInPosition**, **MakeOrder**.

## Our use case flow would be 

1. Set Loading flag
2. Try do buisiness logic
3a. If succeded - put new data into state
3b. Otherwise - put errors into state
5. Take off the Loading flag

## Our use case logic for cases would be:

### Initialize:

1. Send request for available products
2. Take all products from responce and put them into state

### AddPositionToChart

1. Make position out of product with amount of 1
2. Put new position to state

### ChangeAmountInPosition

1. Check if new amount is not zero
2a. Change amount
2b. Remove the whole position.

### MakeOrder

1. Send check for positions avalability request
2a. Send make order request
3a. Clear positions
2b. Put message from responce in state (there might be some info what product is missing)

# Lets literally translate it to code

At first iteration, we'll be using pseudo-code

```

function EntryPoint() {

    setLoadingFlag()

    try {

        if (Initialize) do Initialize()
        if (AddPositionToChart) do AddPositionToChart()
        if (ChangeAmountInPosition) do ChangeAmountInPosition()
        if (MakeOrder) do MakeOrder()

    } catch(errors) {

        putErrorsToState()

    } finally {

        getOffLoadingFlag()

    }
}

function Initialize() {
    initialProducts = requestForAvailableProducts()
    putProductsIntoState(initialProducts);
}

function AddPositionToChart(product) {
    newPosition = {
        product,
        1,
    }
    putPositionToState(newPosition)
}

function ChangeAmountInPosition(position, amount) {
    isAmountZero =  amount === 0;
    if (isAmountZero) {
        deletePosition(position)
    } else {
        setPositionAmount(position, amount)
    }
}

function MakeOrder() {
    order = selectAllPositions;
    requestResult = requestOrderCheck()

    greenToOrder = isResultOk(requestResult)

    if (greenToOrder) {
        makeOrderRequest()
        clearShoppingChart()        
    } else {
        putMessageFromResponseToState(getMessage(requestResult))
    }
}

```

# The Point 1

What I want to point here, is that the logic that is **writen in the requiriments** stays the same.
It's just get writtem in a bizzare language. The result code would most likely look even a little more strange.

For example if we were using the ```redux-saga``` we end up with function-generators and each line starts with the yield keyworld, but it is still the same **well written requiriments** we started with.

# The Point 2

```redux-domain-types``` does no more then **putSomethingToState** and **selectSomethingFromState** part.