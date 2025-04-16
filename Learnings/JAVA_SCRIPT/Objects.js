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
    nested: { level: 1 },
    date: new Date(),
    map: new Map([["key", "value"]]),
    set: new Set([1, 2, 3])
};

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
