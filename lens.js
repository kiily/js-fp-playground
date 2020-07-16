// https://medium.com/javascript-scene/lenses-b85976cb0534
// This is a naive implementation of lenses to understand the concept
// There are well established libraries out there, such as Ramda.js
// that should be preferred for this kind of task

// Create pure props for view and set; these are generic for any lens
const view = (lens, store) => lens.view(store);
const set = (lens, value, store) => lens.set(value, store);

// lensProp --> this function takes a prop and returns the value of 
// the lens accessors for that prop
const lensProp = prop => ({
    view: store => store[prop],
    set: (value, store) => ({
        ...store,
        [prop]: value
    })
});

// Example store object on which we want to use the lens
// to get a part of said store
const fooStore = {
    a: 'foo',
    b: 'bar',
}

const aLens = lensProp('a');
const bLens = lensProp('b');

// Destructure 'a' and 'b' props from the respective lenses
// by using the general purpose view() function
const a = view(aLens, fooStore);
const b = view(bLens, fooStore);

console.log(a,b) // 'foo' 'bar'

// We can create a new immutable store
// while setting a value with the general purpose setter
const bazStore = set(aLens, 'baz', fooStore);

console.log(view(aLens, bazStore));

/*****************************************************************************/
// Proving lens laws i.e algebraic axioms that ensure the lens is well behaved
const store = fooStore;

{
    // 1. view(lens, set(lens, value, store)) === value i.e. if you set a value in
    // the store and immediately view that value through the lens, you should always get
    // the set value
    const lens = lensProp('a');
    const value = 'baz';

    const a = value;
    const b = view(lens, set(lens, value, store));
    console.log(a, b); // 'baz' 'baz'
}

{
    // 2. set(lens, b, set(lens, a, store)) === set(lens, b, store)
    // If we set a lens to value 'a' then immediately set it to value 'b'
    // It is the same as just setting the value for 'b'
    const lens = lensProp('a');
    const a = 'bar';
    const b = 'baz';

    const r1 = set(lens, b, set(lens, a, store));
    const r2 = set(lens, b, store);
    console.log(r1, r2); // {a: "baz", b: "bar"} {a: "baz", b: "bar"}
}

{
    // 3. set(lens, view(lens, store), store)` === `store`
    // If we get a lens value from the store and immediately set that value
    // back into the store, the value remains unchanged (but a new store is generated)
    const lens = lensProp('a')
    const r1 = set(lens, view(lens, store), store);
    const r2 = store;

    console.log(r1,r2); // {a: "foo", b: "bar"} {a: "foo", b: "bar"}
}

/*****************************************************************************/