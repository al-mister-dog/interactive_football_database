const mysql = require("mysql2");
const config = require("config");
const dbConfig = config.get("database");

const options = {
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
};

const db = mysql.createPool(options);
module.exports = db;