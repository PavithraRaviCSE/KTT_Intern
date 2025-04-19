// constructors, literals

// delete the object [delete obj1]

let a = {
    name: "pavi"
}
console.log('a', a, a.name);

delete a;
console.log('a', a, a.name);

delete a.name;
console.log('a', a, a.name);


a = 'name';

b = {
    [a]: "pavi"
}
console.log('b', b, b.name);


function createUser(name, age) {
    return {
        name: name,
        age: age
    };
}

let user = createUser("pavi", 22);
console.log(user.name);

console.log("name" in user, user.name, "id" in user, user.id);
function createUser(name, age, id) {
    return {
        name: name,
        age: age,
        id: id
    };
}

for (let key in user) {
    console.log(key, user[key]);
}

const user2 = user;
console.log('̥user2 == user ', user2 == user, "user2=== user", user2 === user);

user2.name = 'nive';
console.log('̥user2.name', user2.name, "user.name", user.name);
user2.add = () => 5 + 10;

const user3 = Object.assign({}, user);
console.log('̥user3 == user ', user3 == user, "user3=== user", user3 === user, user3.add());
user3.add = () => 10 + 10;

user3.name = 'Moni';
console.log('̥user3.name', user3.name, "user.name", user.name, user3.add(), user2.add());


// let user4 = structuredClone(user);
// console.log('̥user4 == user', user4 == user, "user4 === user", user4 === user);

const original = {
    name: "Pavi",
    age: 22,
    skills: ["JS", "HTML"],
    date: new Date(),
    map: new Map([["key", "value"]]),
    set: new Set([1, 2, 3])
};

module.exports = {original};


// JSON clone
const jsonClone = JSON.parse(JSON.stringify(original));

// Shallow copy
const shallowClone = { ...original };

// Structured clone
const deepClone = structuredClone(original);


console.log('̥jsonclone', jsonClone);
console.log('shallowClone', shallowClone);
console.log('deepClone', deepClone);

let clone = {};
// console.log('̥clone.name', clone.name.lastname);
console.log('̥ Optional chaining: clone.name', clone?.name?.lastname);
clone.next = clone;

nextedClone = structuredClone(clone);

console.log('̥nextesClone', nextedClone);


// factory function

function createUser(firstName, lastName) {
    return {
        firstName,
        lastName,
        getFullName() {
            return firstName + " " + lastName;
        }
    };
}
let user1 = createUser("pavi", "r");
console.log('user1:', user1, user1.getFullName()); // "pavi r"

// constructor function

const User = function (firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = function () {
        return this.firstName + " " + this.lastName;
    };
};

let user5 = new User("pavi", "r"); // use `new`
console.log('user2:', user5, user5.fullName()); // "pavi r"


// object creation methods
// Using new Object()
let obj1 = new Object();
obj1.id = 1;

// Using object literal
let obj2 = {};
obj2.id = 1;

// Using factory function
const FactoryFunctionObj = function fn(id, name) {
    return {
        id,
        name
    };
};
let obj3 = FactoryFunctionObj(1, "pavi"); // no 'new' needed for factory function

// Using constructor function
function constructorFunctionObj(id, name) {
    this.id = id;
    this.name = name;
}
let obj4 = new constructorFunctionObj(1, "pavi"); // 'new' is required

// Using ES6 class
class Person {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
let obj5 = new Person(1, "pavi"); // 'new' is required


// sample student object
const Student = (name, dept, dob) => {
    return {
        name,
        dept,
        dob,

        get data() {
            return this.name + " " + this.dept;
        }

    };
};

let nive = Student("nive", "cse", "01/10/2004");
let moni = Student("moni", "cse", "01/10/2004");

console.log('̥nive', nive, nive.data);
console.log('moni', JSON.stringify(moni));


function Customer(name, age) {
        this.name = name,
        this.age = age,
        this.data = () => {
            name + age;
        }
        Object.defineProperty(this, 'dept', {
            get: function () {
                return "cse";
            }
        });

        this.toJSON = function () {
            return {
                name: this.name,
                age: this.age,
                data: this.data(),
                dept: this.dept
            };
        };
}

let customer1 = new Customer("Nive", 20);
let c2 = Customer("nive", 23);
console.log('̥customer1', JSON.stringify(customer1), customer1.name);
// console.log('c2', c2.name);
console.log('c2', c2?.name, typeof(c2));

const obj = null;
console.log(obj?.someProperty); 
console.log("End");

console.log('̥get keys', Object.keys(customer1));
console.log('̥get values', Object.values(customer1));
console.log('̥get entries', Object.entries(customer1));

customer1.lastname = "r";
console.log('̥customer1',customer1);
Object.freeze(customer1);
customer1.lastname = "K";
console.log('̥customer1',customer1);
console.log(customer1.hasOwnProperty("age"));









