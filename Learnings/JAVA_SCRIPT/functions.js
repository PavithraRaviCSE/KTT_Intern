function myFunc(a, b, c,...others) {
    console.log("Arguments passed:", arguments.length);
    console.log('a,b,c',a,b,c, arguments[3], others);
}

myFunc(1, 2,3, 4, 5, 6); 


let add = function(x,y){ return x+y;};
let sub = (x,y) => x-y;
let square = x => x**2;
let print = () => console.log('print');
console.log("add: " , add(5,10), "sub: ", sub(10,5),"square: ",square(10), print );

console.log('$', typeof(Symbol('$')));
