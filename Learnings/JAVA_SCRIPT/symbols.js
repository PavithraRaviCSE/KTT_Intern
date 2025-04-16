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
