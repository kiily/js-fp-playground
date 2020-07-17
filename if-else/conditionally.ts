// Functional if-else
// https://itnext.io/if-else-and-try-catch-as-functional-constructs-da5c6a749f8c
export const conditionally = (config) => (props) => {
    return config.if(props) ? config.then(props) : config.else(props);
}

// The config above has 3 functions, if(), then(), else();
export const conditionallyTS = <Props, Result>(options: {
    if: (props: Props) => any;
    then: (props: Props) => Result | Result
    else: (props: Props) => Result | Result
}) => (props: Props) => {
    return options.if(props) ? options.then(props) : options.else(props);
}

// Example use case
const hasGoodRating = rating => rating > 4;

// Concerns are clearly separated in this pattern and can 
// all be tested in isolation. Functions have single responsibility
// and are easy to read
const priceChange = conditionallyTS({
    if: hasGoodRating,
    then: rating => 1000 * rating,
    else: () => 1000,
});

const getDescription = conditionallyTS({
    if: hasGoodRating,
    then: () => 'good car',
    else: () => 'bad car',
});

function getCarConfig(car) {
    return {
        newPrice: priceChange(car.rating) + car.pricem
        description: getDescription(car.rating)
    }
}