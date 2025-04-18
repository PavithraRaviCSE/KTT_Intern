const arr = [1,2,3,4,5,5,5,5];
const set = new Set(arr);
console.log('̥arr', arr, 'set', set, "back to array", [...set]);

set.add(10);
console.log('̥set:',set, set.add(30), set.delete(5), set.clear());

//map
let map  = new Map([[1,"pavi"],[2,"nive"]]);

console.log('̥map: ', map, map.get(1));
map.set(1,null);
console.log('̥map: ', map, map.get(1));

// weakmap and weakset

// weakmap -> only store object, no iterable, references is removed the data will be removed,
let weakmap = new WeakMap();
let user1 = {name:"name"};
let user2 = {name:"name"};

weakmap.set(user1, "user1");
weakmap.set(user2, "user1");

console.log('̥map.get(user1)',weakmap.get(user1));
user1 = null;
console.log('̥map.get(user1)',weakmap.get(user1));

// weakset  objects only, no size limit, no sequence is storing the data

let weakset = new WeakSet();

let user3 = {name: "pavi"};
let user4 = {name: "pavi"};
set.add(user3);
set.add(user4);
console.log('weakset.has(user3)',weakset.has(user3) );
user3 = null;
console.log('weakset.has(user3)',weakset.has(user3) );

let a = null;
console.log('̥a',a);
