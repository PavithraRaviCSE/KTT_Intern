
try{


//    console.log(a);

}catch(err){
    // console.log("error:" , err);
    console.log("error name: ". err.name); 
    console.log("error message" ,err.message); 
    console.log("error stack",err.stack); 
}



let json = '{ "age": 30 }'; 

try {

  let user = JSON.parse(json); 

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }


} catch (err) {
  console.log( "JSON Error: " + err.message );
}
finally {
    console.log('̥finally');
  }