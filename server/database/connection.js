const { Client } = require('pg');

const cliente = new Client({
  connectionString: process.env.CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = cliente