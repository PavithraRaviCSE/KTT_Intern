let a = 5;
console.log(a, typeof (a));

a = String(a);
console.log(a, typeof (a));

a = 5;
b = 5;

console.log('̥a + b' + a + b);
console.log('̥a + b', a + b);
console.log(a + b, '̥a + b');
console.log(String(a) / String(b), '̥a / b');

b = "5";
b = Number(b);

console.log(typeof (b));

b = "sdsf";
b = Number(b);
console.log(b);
console.log(typeof (b));

b = "hello";
b = Boolean(b);
console.log(b);
b = "";  //false  "0"," " , "hello", "1" // true
b = Boolean(b);
console.log(b);

b = 5;
console.log(!b);
console.log(!!b);
console.log(!null);
console.log(!!null);
console.log("!undefined ", !undefined);
console.log("!!undefined  ", !!undefined);

//nulish-coalescing-operator
b = null;
a = b ?? "hello";
console.log('̥a: ' + a);
//null,undefined, false, -> false
//0,anything -> true;

let x = (8 && 4);
console.log('̥x: ', x);


//for

label1: for (let i = 0; i <= 2; i++) {
    label2: for (let j = 0; j <= 2; j++) {

        if(i == 1)
            break label2;
        if(i == 2 && j == 2)
            break label1;

        console.log('log: ' ,i , " ", j);
    }
}

console.log("0 === false:", 0 === false);
console.log("0 == false:", 0 == false);
console.log("0 === '':", 0 === '');
console.log("0 == '':", 0 == '');
console.log("0 === undefined:", 0 === undefined);
console.log("0 == undefined:", 0 == undefined);
console.log("0 === null:", 0 === null);
console.log("0 == null:", 0 == null);
