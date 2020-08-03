const mysql = require("mysql2/promise")

let connection

module.exports = {
  async initDB() {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: '',
      database: "web_009_test"
    })
  },
  getDB () {
    return connection
  }
}