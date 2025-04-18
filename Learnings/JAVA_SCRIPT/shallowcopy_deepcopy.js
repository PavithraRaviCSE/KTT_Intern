let customer1 = {
    name: "nive",
    age: 20,
    address: {
        state: "TN",
        district: "Salem"
    }
}

customer2 = customer1;
console.log('̥customer1', customer1, "customer2", customer2);

customer2.address.district = "cbe";
console.log('̥customer1', customer1, "customer2", customer2);

customer2.age = 30;
console.log('̥customer1', customer1, "customer2", customer2);


// Shallow copy
// nested object reference are copied not the objects itself

let person = {
    name: "nive",
    age: 20,
    address: {
        state: "tn",
        district: "salem"
    }
}

let person2 = Object.assign({}, person);
console.log('̥person', person, "person2", person2);

person2.age = 22;
person2.address.district = "cbe";

console.log('̥person', person, "person2", person2);


//shallow copy
const original = {
    name: 'Alice',
    age: 25,
    address: {
        state: "tn",
        district: "salem"
    }

};
const copy = { ...original };
console.log('̥oringinal', original, "copy", copy); 
copy.age = 30;
copy.address.district = "cbe";
console.log('̥oringinal', original, "copy", copy); 

// deep copy
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.district = "chennai";
console.log('̥oringinal', original, "deepCopy", deepCopy); 

//deep copy
const clone = structuredClone(original);
clone.age = 20;
clone.address.district = "salem";
console.log('̥oringinal', original, "clone", clone); 



