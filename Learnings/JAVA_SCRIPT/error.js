class ValidationError extends Error{
    constructor(errormessage){
        super (errormessage);
        this.name = "validation error";
    }
}

function test(){
    throw new ValidationError("error occured");
}

try{
    tests();
}
catch(err){

    if(err instanceof ValidationError)
        console.log('̥err', err.name);
    else{
        console.log('̥e: ',err.name);
    }
}


// tyeps of error
// 1. SyntaxError
 try {
    eval('console.log("Hello"'); 
  } catch (e) {
    console.log('SyntaxError:', e.message);
  }
  
  // 2. ReferenceError
  try {
    console.log(x); 
  } catch (e) {
    console.log('ReferenceError:', e.message);
  }
  
  // 3. TypeError
  try {
    let num = 5;
    num.toUpperCase(); 
  } catch (e) {
    console.log('TypeError:', e.message);
  }
  
  // 4. RangeError
  try {
    let arr = new Array(-1); 
  } catch (e) {
    console.log('RangeError:', e.message);
  }
  
 
 