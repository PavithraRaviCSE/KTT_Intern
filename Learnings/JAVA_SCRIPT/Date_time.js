let currentdate = new Date();
console.log('̥currentdate', currentdate);
console.log('̥currentdate', currentdate.toString());
console.log('̥currentdate', currentdate.toLocaleString());
console.log('̥currentdate', currentdate.toLocaleDateString());

const year = currentdate.getFullYear();
const date = currentdate.getDate();
const month = currentdate.getMonth();
const time = currentdate.getTime();
const day = currentdate.getDay();

console.log('year', year, 'date', date, 'month', month, "time", time,"day", day);

let yesterday = new Date(1744970789502 - 24*60*60*1000);

console.log('̥yesterday', yesterday);


console.log('̥typeof(date)', typeof(Date), typeof(currentdate));