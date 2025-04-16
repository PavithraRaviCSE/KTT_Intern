const numberExample = {
    int: 100,
    float: 3.14159,
    negative: -42,
    exp: 1.23e4, 
    notANumber: NaN,
    infinity: Infinity,
    
    showDetails: function() {
      console.log(" Integer:", this.int);
      console.log(" Float:", this.float);
      console.log(" Negative:", this.negative);
      console.log(" Exponential:", this.exp);
      
      console.log("isFinite(int):", isFinite(this.int));            
      console.log("isFinite(infinity):", isFinite(this.infinity));  
      
      console.log("isNaN(NaN):", isNaN(this.notANumber));          
      console.log("isNaN(int):", isNaN(this.int));                 
  
      console.log("toFixed(2) [float]:", this.float.toFixed(2));               
      console.log("toPrecision(4) [exp]:", this.exp.toPrecision(5));          
      console.log("toExponential(2) [int]:", this.int.toExponential(2));      
      console.log("toString() [negative]:", this.negative.toString(2));     
      console.log("valueOf() [int]:", this.int.valueOf());                  
    }
  };
  
  numberExample.showDetails();
  

  let a = 5;
  let b = a;
  a = 10;

console.log('a === b', a===b, a==b);


a = Math.random();
console.log('a: ',a);

