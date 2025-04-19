let a;

function print(a, callback){
    let num = a;

    callback(num);
}
print(10, (a) => {
    console.log('̥a: ' , a);
});