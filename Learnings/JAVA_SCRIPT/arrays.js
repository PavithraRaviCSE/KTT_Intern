let fruits = [];


fruits[999] = 5; 

fruits.age = 25

console.log('fruits', fruits, fruits.length);

fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes', 'Pineapple'];
console.log(fruits);

let index = fruits.indexOf('Mango');
console.log('Index of Mango:', index);

let removedFruit = fruits.splice(2, 1);
console.log('Array after splice:', fruits);
console.log('Removed fruit:', removedFruit);

let slicedFruits = fruits.slice(1, 4);
console.log('Sliced fruits:', slicedFruits);

let moreFruits = ['Strawberry', 'Blueberry'];
let allFruits = fruits.concat(moreFruits);
console.log(allFruits);

let lastIndex = fruits.lastIndexOf('Banana');
console.log('Last index of Banana:', lastIndex);

console.log( fruits.includes('Pineapple'));

let fruitsWithA = fruits.filter(fruit => fruit.includes('a'));
console.log('̥fruitsWithA',fruitsWithA);


let arr = [ 1, 2, 15 ];
arr.sort();

console.log('̥sorted array: ', arr, arr.reverse());


const users = [
    { id: 1, name: "pavi" },
    { id: 2, name: "Kavi" },
    { id: 3, name: "Nive" },
];
console.log('users: ', users);
console.log();

let updateduser = users.map(user => {
    user.id += 5;
    return user;
});

console.log('updated: ', updateduser, "user: ", users);
console.log();


let updateduser3 = users.map(user => {
    return { ...user, id: user.id + 10 };
});
console.log('updated2: ', updateduser3, " user: ", users);
console.log();

const user = { id: 1, name: "Pavi" };
const user1 = user;
console.log('user1 === user', user1 === user);

const clone = { ...user };
console.log(clone);
console.log('clone === user', clone === user);
console.log();

const products = [
    { name: "sports car" },
    { name: "laptop" },
    { name: "phone" },
  ];
  
  products.map((product) => {
    product.price = 100;
  });


  console.log('̥products: ' , products);

let numbers = [1, 2, 3, 4, 5];
let squares = numbers.map(num => num * num);
console.log("Modified original array:", squares, " ", numbers);

numbers = numbers.map(num => num * num);
console.log(numbers);


let a = "Hello";
console.log('̥a[0]', a[12]);


