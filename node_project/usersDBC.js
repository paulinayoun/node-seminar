const mysql = require("mysql");

// Create the connection pool. The pool-specific settings are the defaults
/* const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "test",
  password: "##hnic123",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

connection.connect();

connection.query("SELECT * FROM users", (error, rows, fields) => {
  if (error) throw error;
  console.log("User info is: ".rows);
});
 
connection.end();
*/

module.exports = {
  host: "192.168.1.139",
  port: "3308",
  user: "root",
  database: "test",
  password: "##hnic123",
};
