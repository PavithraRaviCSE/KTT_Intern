let nums = [1,2,3,4,5];

for(let items of  nums){
    console.log(items);
}

const  iterator = nums[Symbol.iterator]();

console.log('̥iterator.next()', iterator.next());

let iteratorEg = {
    current:1,
    last:5,
    next(){
        if(this.current <= this.last){
            return {Value:this.current++, done:false}
        }
        else{
            return {value:undefined, done:true}
        }
    }
}

console.log('̥iterator.next()' , iterator.next());

let customer = {
    name: "Nive",
    age: 20
};

for (let key in customer) {
    console.log(key, customer[key], customer.key);
}



nums = [1,2,3,4,5];


let iterator2 = {
    from:5,
    to:1,

    [Symbol.iterator](){
        this.current = this.from;
        return this;

    },
    next(){

        console.log('̥next function is called');
        if(this.from >= this.to){
            return {done: false, value: this.from--}
        }
        else{
            return {
                done: true, value: undefined
            } 

        }
    }
}


for (let num of iterator2) {
    console.log(num); 
  }