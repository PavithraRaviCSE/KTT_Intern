// timer queue(setTimeOut, setInterval), io(http module) queue , check queue, close queue  are the  part of libuv in event loop
//micretask queue:  next queue, promise queue 
// ecextuion  -> microtask queue(next queue followed by promise queue)
//            -> timer queue
//            -> microtask
//            -> io
//            -> microtask
//            -> check queue
//            -> microtask
//            -> close queue
//            -> microtask


const fs = require('fs');

// index.js
console.log('Hello from Node.js!');

fs.readFile('./sample.txt',{encoding: 'utf-8'}, (err, data) => {
    if(err){
        console.log('̥error:', err);
    }
    else{
        console.log('̥data:', data);
    }
});
        
fs.promises.readFile('./sample.txt').then((data) =>console.log('̥data:',  data.toString())).catch((err)=>{console.log('̥error:', err)});

fs.writeFile('./sample2.txt',"this is file 2", ()=>{
    console.log('̥file saved');
} );

fs.appendFile('./sample2.txt',"append file", ()=>{
    console.log('̥file saved');
} );


setTimeout(() => {
    fs.unlink("sample2.txt",(err)=>{
        console.log('̥file deleted');
    });
}, 10000);


