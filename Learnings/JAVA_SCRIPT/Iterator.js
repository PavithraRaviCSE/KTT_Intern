let nums = [1,2,3,4,5];

for(let items of  nums){
    console.log(items);
}


const  iterator = nums[Symbol.iterator]();

console.log('̥iterator.next()', iterator.next());

let iteratorEx = {
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