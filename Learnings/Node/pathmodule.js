const path = require('path');


console.log('̥file name', __filename);
console.log('̥path', __dirname);



let obj = path.parse(__filename);
console.log('̥parse obj:', obj);
console.log('̥file name: ' , path.basename(__dirname)," ", path.basename(__filename));
console.log('̥extension: ', path.extname(__filename));
console.log('̥absolute path', path.isAbsolute(__filename));
console.log('̥./sample.txt is absolute path', path.isAbsolute("./sample.txt"));

console.log('̥path join example: ',path.join("folder1", "folder2", "app.js"));
console.log('̥path join example: ',path.join("/folder1", "folder2", "app.js"));
console.log('̥path join example: ',path.join("/folder1", "//folder2", "app.js"));
console.log('̥path join example: ',path.join("/folder1", "folder2", "../app.js"));
console.log('̥new path', path.join(__dirname, "data.json"));


console.log('resolve  example: ',path.resolve("folder1", "folder2", "app.js"));
console.log('resolve  example: ',path.resolve("/folder1", "folder2", "app.js"));
console.log('resolve  example: ',path.resolve("/folder1", "//folder2", "app.js"));
console.log('resolve  example: ',path.resolve("/folder1", "folder2", "../app.js"));
console.log('̥new path', path.resolve(__dirname, "data.json"));
