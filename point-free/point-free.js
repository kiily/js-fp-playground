// Example of point free style
const add = a => b => a + b;
const inc = add(1);

console.log(inc(3));
// Point-free example where we have a function that does not reference it's arguments
const inc10 = add(10);
inc10(3);