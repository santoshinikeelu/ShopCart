const mySql = require('mysql')

//---------------------DataBase Connection
const DB = mySql.createConnection({
    host:"localhost",
    user: "root",
    password: '123456789',
    database:'shop'
  
  });
  
 DB.connect(function(err) {
    if (err) throw err;
    console.log("Database Connected!");
  });

  module.exports = DB