// https://towardsdatascience.com/javascript-currying-vs-partial-application-4db5b2442be8
// https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339
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

// Eric Elliot's compose - bottom up representations
const composeBetter = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

// Do not confuse Currying with Partial application
// just bundled here for convenience
// Addition with partial application
const plus5 = addition.bind(null, 5)
plus5(10) // 15

// the above can also be achieved with lodash partial

// Additional examples
function volume(l, w, h) {
    return l * w * h;
}

const aCylinder = volume(100, 20, 90);
console.log("aCylinder", aCylinder)

// ES6
const volumeEs6 = l => w => h => l * w * h;

const bCylinder = volumeEs6(100)(20)(90);
console.log("bCylinder", bCylinder)

// Can also get only parts of the function and then apply the remaining arguments later
const hW = volumeEs6(100)
const cCylinder = hW(20)(90)
console.log("cCylinder", cCylinder)

// The curried function can also be designed differently
// and remain equivalent in functionality to the above
const volumeEs6Alt = l => (w, h) => l * w * h;
const hWH = volumeEs6Alt(100);
const dCylinder = hWH(20, 90);
console.log("dCylinder", dCylinder)