import { print, addition as add, default as defaultFunction } from './modulesamplefunction.mjs';

import * as all from './modulesamplefunction.mjs';




print();                        
console.log(add(2, 3));   
// console.log(addition(2, 3));   // cause error
defaultFunction();             

console.log("Using all:");
all.print();
print();
console.log(all.addition(1, 1));
all.default();                
