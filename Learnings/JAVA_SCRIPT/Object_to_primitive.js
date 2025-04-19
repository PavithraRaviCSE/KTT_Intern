let obj1 = {
    age: 10
}
let obj2 = {
    age: 10
}


console.log("obj1 + obj2: ", obj1 + obj2);
console.log("obj1 + obj2: ", obj1 + obj2);
console.log("obj1.toString(): ", obj1.toString());


const user = {
    name: "Nive",
    age: 20,
    toString() {
        return this.name;
    },
    valueOf() {
        return this.age;
    }
};

console.log(user + 5);
console.log(String(user));
const productA = {
    quantity: 50,
    name: "pavi",
    [Symbol.toPrimitive](hint) {
        if (hint === "number") {
            return this.quantity;
        } else if (hint === "string") {
            return this.name;
        } else {
            return this.name;
        }
    }
};

console.log('productA + 50 =', +productA + 50);
console.log('productA + " R" =', productA + " R");
console.log(' 50 + productA =', 50 + productA);

const { original } = require("./Objects.js");

console.log('importing object form objects.js: ', original);

// dynamic import


import("./modulesamplefunction.mjs").then(({ print }) => {
    print();
});
