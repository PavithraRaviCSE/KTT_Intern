let num = 37423429423n;
let num2 = 37423429423n;

// num += 1;
num2 += 1n;

// console.log(num," ", num2);
let a = {
    b: 5,
    get c() {
        return this.b + 1;
    },
    toString() {
        return `{ b: ${this.b}, c: ${this.c} }`;
    }
};

// console.log(JSON.stringify(a));

let d = {
    b: 5,
    get c() {
        return this.b + 1;
    },
    toJSON() {  // Used by JSON.stringify()
        return { b: this.b, c: this.c };
    }
};
// console.log(d); 
// console.log(JSON.stringify(d)); 


let d1 = {
    p: 10,
    c: 20,
    get d() { return this.p + this.c },
    get add() {
        return this.p + this.c
    }

}

console.log(d1.add);
console.log(JSON.stringify(d1));

let person = {
    firstName: "John",
    lastName: "Doe",

    get fullName() {
        return this.firstName + " " + this.lastName;
    },
    set fullName(name) {
        const parts = name.split(" ");
        this.firstName = parts[0];
        this.lastName = parts[1];
    }
};


let a1 = [1, 2, 3];
delete a1[1];
console.log(a1);

a1[100] = 100;
console.log(a1.length);

console.log(a1[100]);
delete a1[100];

console.log(a1.length);