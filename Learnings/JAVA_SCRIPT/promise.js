// promise
// state: pending, fullfilled, rejected
// result: undefined,done,  error

export let promise_sample = new Promise((resolve, reject) => {

    resolve("resolved");
    reject(new Error("promise is rejected"));

})

promise_sample.then((res) =>{

    console.log('̥promice is ', res);
}).catch((err)=>{
    console.log('̥error', err);
});

// let promise = new Promise((resolve, reject) => {
//     reject("An error occurred!");
//   });
  
//   promise
//     .then(result => {
//       console.log(result);  // Won't run
//     });


    Promise.all([
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
      ]).catch((err) => console.log('̥promise', err));

// methodsdsd
/* 
Promise.all
Promise.resolve
Promise.reject
Promise.any
Promise.race
Promise.allSettled 
hfhf
*/
