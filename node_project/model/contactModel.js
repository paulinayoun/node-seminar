const mysql = require("mysql");
const dbconfig = require("../usersDBC.js");
const connection = mysql.createConnection(dbconfig);
const StringBuilder = require("string-builder");

const get_user = (cb) => {
  var sb = new StringBuilder();
  sb.appendLine("SELECT ");
  sb.appendLine(" USER_ID");
  sb.appendLine(" ,USER_NM");
  sb.appendLine(" ,CONTENT");
  sb.appendLine(" ,DATE_FORMAT(REG_DATE,'%Y-%m-%d')AS REG_DATE");
  sb.appendLine("FROM USERS");
  sb.appendLine("ORDER BY REG_DATE,USER_ID");
  connection.query(sb.toString(), (error, rows) => {
    if (error) throw error;
    //console.log("User info is: ", rows);
    cb(rows);
  });
};

//, cb
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

const update_user = (body) => {
  var sb = new StringBuilder();
  sb.appendLine("UPDATE USERS");
  sb.appendLine("SET");
  sb.appendLine("     USER_NM ='" + body.userNm + "' ");
  sb.appendLine("     ,PASSWD ='" + body.passwd + "' ");
  sb.appendLine("     ,CONTENT ='" + JSON.stringify(body.content) + "' ");
  sb.appendLine("     ,MOD_DATE = SYSDATE()");
  sb.appendLine("WHERE USER_ID = '" + body.userId + "' ");

  connection.query(sb.toString(), (error, rows) => {
    if (error) throw error;
    //cb(rows.insertId);
  });
};

const delete_user = (userId) => {
  var sb = new StringBuilder();
  sb.appendLine("DELETE FROM USERS");
  sb.appendLine("WHERE USER_ID = " + userId);

  connection.query(sb.toString(), (error, rows) => {
    if (error) throw error;
    //cb(rows);
  });
};

module.exports = { get_user, insert_user, update_user, delete_user };

/*
exports.get_user = (cb) => {
  var sb = new StringBuilder();
  sb.appendLine("SELECT ");
  sb.appendLine(" USER_ID");
  sb.appendLine(" ,USER_NM");
  sb.appendLine(" ,DATE_FORMAT(REG_DATE,'%Y-%m-%d')AS REG_DATE");
  sb.appendLine("FROM USERS");

  connection.query(sb.toString(), (error, rows) => {
    if (error) throw error;
    console.log("User info is: ", rows);
    cb(rows);
  });
};
*/
