// Lens composition
// Composing lenses allows us to dive deeper into objects and traverse full object paths
import { compose, lensProp, view } from 'ramda';

const lensProps = [
    'foo',
    'bar',
    1
];

const lenses = lensProps.map(lensProp);
const truth = compose(...lenses);

const obj = {
    foo: {
        bar: [false, true]
    }
}

console.log(view(truth, obj)); 
