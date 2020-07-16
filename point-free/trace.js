// Trace can be handy to debug in point-free style code.
const trace = label => value => {
    console.log(`${label}: ${value}`);
    return value;
}

// Can then use this inside a composition logic
const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x);

const g = n => n + 1;
const f = n => n * 2;

// Functions apply from bottom to top in the reduceRight composition
const h = compose(
    trace('after f'),
    f,
    trace('after g'),
    g
);

h(20);

// Top to bottom is more readable and can be done by using a pipe
// function that composes in reverse order - this is similar to
// the example in curry/curry-example.js 
const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);
const hPiped = pipe(
    g,
    trace('after g'),
    f,
    trace('after f')
);

hPiped(20)