// const mysql = require('mysql2');
// require('dotenv').config();

// const credenciales = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password : process.env.DB_PASSWORD,
//     database : process.env.DB_NAME
// }

// const db = mysql.createPool({credenciales});


// // db.connect((error)=>{
// //     if(error){
// //         console.error('error al conectar: ',error);
// //         return;
// //     }
// //     console.log('conexion esitosa');
// // });


// module.exports = db.promise();

// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// module.exports = pool;
const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
