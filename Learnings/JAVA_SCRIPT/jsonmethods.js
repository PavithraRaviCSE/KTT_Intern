let student = {
    name: "pavi",
    dept: "CSE"
}

let obj = JSON.stringify(student);
console.log('̥json string', obj, typeof (obj));


// let circularobj = {
//     a: circularobj
// }
// console.log('̥1n to json', JSON.stringify(1n));
// console.log('̥symbol to json', JSON.stringify(Symbol["hello"]));
// console.log('̥function to json', JSON.stringify(Math));
// console.log('̥undefined to json', JSON.stringify(undefined));
// console.log('̥circulatobj to json', JSON.stringify(b));

// json not supported
// symbol, function, undefined, bigint, circular object


// json supported
// Number except big int
// Strings
// Booleans
// Arrays
// Objects
// null


let numbers = [1, 2, 3, 4, 5];
let people = [
    {
        name: "nive",
        age: 20
    },
    {
        name: "Kive",
        age: 25
    }

]

let numbersString = JSON.stringify(numbers);
let peopleString = JSON.stringify(people);

console.log('numbers:', numbers);
console.log('numbers to JSON string:', numbersString);
console.log('JSON string to JS (parse):', JSON.parse(numbersString),"type of : " , typeof(JSON.parse(numbersString)));

console.log('people:', people);
console.log('people to JSON string:', peopleString);
console.log('JSON string to JS (parse):', JSON.parse(peopleString));