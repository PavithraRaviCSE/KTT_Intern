// var → Function scope, Global if outside function
// let → Block scope
// const → Block scope, can't be reassigned

var user = "Pavi";
if (true) {
    var user = "Kavi";
    console.log("Inside block:", user);
}
console.log("Outside  block:", user);


let items = 2;
if (true) {
    let items = 5;
    console.log("Inside  block:", items); // 5
}
console.log("Outside block:", items); // 2

const app = "MyApp";
// app = "NewApp"; 

const person = { name: "Nive" };
person.name = "Kavi";
console.log("Person name:", person.name);



//var

function testVar() {
    if (true) {
        var name = "Pavi";
    }
    console.log(name);
}
testVar();
// console.log(name); 

var age = 25;

function showAge() {
    console.log("Age inside function:", age);
}
showAge();
console.log("Age outside function:", age);


// let 
function testLet() {
    if (true) {
        let name = "Pavi";
        console.log("Inside block:", name); // Pavi
    }
    // console.log(name); 
}
testLet();

let count = 1;
console.log("Before:", count); // 1
count = 5;
console.log("After:", count); // 5

let city = "Chennai";
if (true) {
    let city = "Madurai";
    console.log("Inside block:", city); // Madurai
}
console.log("Outside block:", city); // Chennai

