
const users = [
    { id: 1, name: "nive", age: 22 },
    { id: 2, name: "moni", age: 17 },
    { id: 3, name: "kavi", age: 25 },
];
//for loop , index based access
console.log("for loop:");
for (let i = 0; i < users.length; i++) {
    console.log(users[i].name);
}

console.log("reverse for loop: ");
for (let i = users.length - 1; i >= 0; i--) {
    console.log(users[i].name);
}




//for of 
console.log("for of loop:");
for (let user of users) {
    console.log(user.name);
}
console.log("convert to uppercase using for... of loop");
const countries = ['Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']
for (const country of countries) {
  console.log(country.toUpperCase())
}



//foreach
console.log("forEach loop:");
let nums = [1, 2, 3];
nums.forEach(num => {
    num => console.log(num * 2);
});
console.log(nums);

console.log("for each with index:");
nums = [1, 2, 3];
nums.forEach((num, index) => {
  console.log(index, num);
});

const users2 = [{ name: "A" }, { name: "B" }];
users.forEach(user => {
  user.active = true; 
});
console.log(users2);

//map
console.log('map: ');
let ages = [1,2,3,44,55,66];
ages = ages.map(age => age.toString().padStart(3,"0"));
console.log(ages);

const numbers = ["1234567890", "9876543210"];
const formatted = numbers.map(num => `+91-${num}`);
console.log(formatted); 



//filters
console.log("filter (age >= 18):");
const adults = users.filter(user => user.age >= 18);
console.log(adults);

//find
users.push({ id: 4, name: "kavi", age: 20 });
console.log("find (first age < 18):");
const teen = users.find(user => user.age < 18);
console.log(teen);

console.log("find name: ");
const userdata = users.find(user => user.name === "kavi");
console.log(userdata);

const userdata1 = users.find(user => user.name === "k");
console.log(userdata1);


//reduce
console.log("reduce (total age):");
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
console.log(totalAge);

let arr = [1, 2, 3, 4];

console.log("reduce: ");
const sum = arr.reduce(fn);
function fn(total, num) {
    return total + num;
}

const minus = arr.reduce(fn2);
function fn2(total, num) {
    return total - num;
}
console.log(sum + " " + minus);

const maxAge = users.reduce((max, user) => { return user.age > max ? user.age : max } , users[0].age);
console.log(maxAge);



