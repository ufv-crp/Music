const knex = require("knex");

const db = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "ufv",
    password: "ufv",
    database: "music"
  }
});

module.exports = db;