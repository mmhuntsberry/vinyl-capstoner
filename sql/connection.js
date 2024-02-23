// This is where I connect mysql
const mysql = require("mysql2");

require("dotenv").config();

const {DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DATABASE, DB_PORT} = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USERNAME,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
});

console.log(pool)

module.exports = pool;