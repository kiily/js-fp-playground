// https://towardsdatascience.com/javascript-currying-vs-partial-application-4db5b2442be8
// Normal function
function addition(x, y) {
    return x + y;
}

// Curried function
function addition(x) {
    return function (y) {
        return x + y;
    }
}

// Curried function ES6
const additionEs6 = x => y => x + y;

// Curry factory method in ES6
const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

// Do not confuse Currying with Partial application
// just bundled here for convenience
// Addition with partial application
const plus5 = addition.bind(null, 5)
plus5(10) // 15