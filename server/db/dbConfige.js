const mysql2= require('mysql2');
const dbConnection= mysql2.createPool({
    
    host:"localhost",
    user:"EvangadiForum",
    password:"a]NURFA[3-nt*Jai",
    database:"evangadiforum", 

    connectionLimit:10

});
// dbConnection.execute("select 'test'",(data,error)=>{
//     if(data)console.log(data);
//     else console.log(error);
//   });
// dbConnection.execute("select 'test' ", (err,result)=>{
//     if(err){
//         console.log(err.message)
//     }
//     else{
//         console.log(result)
//     }
// });

module.exports=dbConnection.promise()