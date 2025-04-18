const secret = Symbol('secret');
const user = {
  name: 'John',
  age: 30,
  [secret]: 'mySecret'
};

for (let key in user) {
  console.log(key); 
}

console.log(Object.keys(user)); 
console.log(user[secret]);      

let obj = {

  name: "pavi",
  dept : "cse",
  dept: "eee"
}

console.log('̥obj', obj);

let sub1 = Symbol("Subject");
let sub2 = Symbol("Subject");

let obj2 = {

  name: "pavi",
  [sub1]:"Math",
  [sub2]:"Physics"

}

console.log('̥obj', obj2);