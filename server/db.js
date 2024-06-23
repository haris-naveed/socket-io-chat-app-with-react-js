const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "message_db",
  password: "flashdrive885",
  port: 5432, // default PostgreSQL port
});

module.exports = pool;
