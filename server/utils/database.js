require('dotenv').config()
const mysql = require('mysql2');

// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
// });

const db = mysql.createPool({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b6b752662974fd',
  password: '174ecfa7',
  database: 'heroku_12c7fb228bf3a38',
});

module.exports = db;