const mysql = require("mysql");
const dbconfig = require("../usersDBC.js");
const connection = mysql.createConnection(dbconfig);
const StringBuilder = require("string-builder");

const get_user = (body, cb) => {
  var sb = new StringBuilder();
  sb.appendLine("SELECT COUNT(*) AS cnt");
  sb.appendLine("FROM USERS");
  sb.appendLine("WHERE 1=1");
  sb.appendLine("  AND USER_ID = '" + body.userId + "' ");
  sb.appendLine("   AND PASSWD = '" + body.passwd + "' ");

  console.log(sb.toString());

  connection.query(sb.toString(), (error, rows) => {
    if (error) throw error;

    cb(rows);
  });
};

module.exports = { get_user };
