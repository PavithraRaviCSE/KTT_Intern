
// map using objects
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
// let updateduser2 = users.forEach(user => {
//     user.id += 10;
// })
console.log('updated: ', updateduser2, " user: ", users);
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

//adding new property in object:
const products = [
    { name: "sports car" },
    { name: "laptop" },
    { name: "phone" },
  ];
  
  products.map((product) => {
    product.price = 100;
  });


  console.log('̥products: ' , products);

// map for arrays
let numbers = [1, 2, 3, 4, 5];
let squares = numbers.map(num => num * num);
console.log("Modified original array:", squares, " ", numbers);

numbers = numbers.map(num => num * num);
console.log(numbers);





