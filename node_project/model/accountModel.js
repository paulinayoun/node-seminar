const mysql = require("mysql");
const dbconfig = require("../usersDBC.js");
const connection = mysql.createConnection(dbconfig);
const StringBuilder = require("string-builder");

const insert_user = (body) => {
  var sb = new StringBuilder();
  sb.appendLine("INSERT INTO USERS(");
  sb.appendLine("     USER_ID");
  sb.appendLine("     ,USER_NM");
  sb.appendLine("     ,PASSWD");
  sb.appendLine("     ,CONTENT");
  sb.appendLine("     ,REG_DATE");
  sb.appendLine(")VALUES(");
  sb.appendLine("     '" + body.userId + "' ");
  sb.appendLine("     ,'" + body.userNm + "' ");
  sb.appendLine("     ,'" + body.passwd + "' ");
  sb.appendLine("     ,'" + JSON.stringify(body.content) + "' ");
  sb.appendLine("     ,SYSDATE()");
  sb.appendLine("   )");

  connection.query(sb.toString(), (error, rows) => {
    if (error) throw error;
    //cb(rows.insertId);
  });
};

//, cb
const check_user = (userId, cb) => {
  var sb = new StringBuilder();
  sb.appendLine("SELECT COUNT(*) AS cnt");
  sb.appendLine("FROM USERS");
  sb.appendLine("WHERE 1=1");
  sb.appendLine("  AND USER_ID = '" + userId + "' ");

  connection.query(sb.toString(), (error, rows) => {
    if (error) throw error;
    cb(rows);
  });
};
module.exports = { insert_user, check_user };
