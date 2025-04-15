// DATATYPES
Number
BigInt
Boolean
undefined
null
String
Symbol

// Number
let a = 10;
let b = 10.5;
let c = 10n; // bigint
let d = Infinity;
let e = NaN;
console.log(a, typeof a, b, typeof b, c, typeof c, d, typeof d, e, typeof e);

// Boolean
a = true;
b = false;
console.log(a, typeof a, b, typeof b);

// String
a = "string";
b = 'string';
console.log(a, typeof a, b, typeof b);

// Undefined
let x;
console.log(x, typeof x);

// Object (Function)
a = function fun() {
    alert("hello");
};
console.log(a, typeof a);

// Object (Math)
a = Math;
console.log(a, typeof a);

// Null
a = null;
console.log(a, typeof a);
// symbol
console.log('$', typeof($));