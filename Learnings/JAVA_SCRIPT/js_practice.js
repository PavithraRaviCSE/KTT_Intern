let num = 37423429423n;
let num2 = 37423429423n;

// num += 1;
num2 += 1n;

console.log(num," ", num2);
let a = {
    b: 5,
    get c() {
        return this.b + 1;
    },
    toString() {
        return `{ b: ${this.b}, c: ${this.c} }`;
    }
};

console.log(JSON.stringify(a));

let d = {
    b: 5,
    get c() {
        return this.b + 1;
    },
    toJSON() {  // Used by JSON.stringify()
        return { b: this.b, c: this.c };
    }
};
console.log(d); 
console.log(JSON.stringify(d)); 


let d1= {
    p:10,
    c:20,
    get d(){
        return this.p + this.c
    },
    get f(){
        return this.p + this.c + 1
    }

}


console.log(JSON.stringify(d1)); 