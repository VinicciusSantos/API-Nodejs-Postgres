const { Client } = require("pg");
require('dotenv').config()

const cliente = new Client({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  }
})

module.exports = cliente