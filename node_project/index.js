const http = require("http");
const mysql = require("mysql");
const dbconfig = require("./usersDBC.js");
const connection = mysql.createConnection(dbconfig);

const hostname = "127.0.0.1";
const port = 8888;

const express = require("express");
const app = express();
const cors = require("cors");
const StringBuilder = require("string-builder");

const path = require("path");
//const svelte = require("svelte");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());

app.get("/main/:name", (req, res) => {
  const q = req.params;

  if (q.name == "dog") {
    res.json({ sound: "멍멍" });
  } else if (q.name == "cat") {
    res.json({ sound: "냐옹" });
  } else {
    res.json({ sound: "없음" });
  }
  console.log(q);
  //res.send({ 멍멍이: q.id, 고양이: "냐옹" });

  const b = req.query;
  console.log(b);

  //res.send(q);
});

app.get("/main2/:name", (req, res) => {
  let name = req.params;

  console.log(name);

  res.send(name);
});

app.use("/main", (req, res) => {
  console.log("접속 중");
  res.send(res);
  /*
  const svelteFilePath = path.join(
    "C:\\Users\\hnic\\Documents\\svelt_project\\svelte-test",
    "src",
    "App.svelte"
  );
  const svelteFileContent = fs.readFileSync(svelteFilePath, "utf-8");
  const { code } = svelte.compile(svelteFileContent);

  res.type("application/javascript").send(code);
  //express.static(path.join(__dirname, "src", "App.svelte"))
  */
});

/*
app.get("/users", (req, res) => {
  var sb = new StringBuilder();
  sb.appendLine("SELECT ");
  sb.appendLine(" USER_ID");
  sb.appendLine(" ,USER_NM");
  sb.appendLine(" ,DATE_FORMAT(REG_DATE,'%Y-%m-%d')AS REG_DATE");
  sb.appendLine("FROM USERS");

  connection.query(sb.toString(), (error, rows) => {
    if (error) throw error;
    console.log("User info is: ", rows);
    res.send(rows);
  });
});
*/

app.listen(port, hostname, () => {
  console.log("start http://" + hostname + ":" + port + "/");
});

app.use("/users", require("./controller/contactController.js"));

app.use("/login", require("./controller/loginController.js"));
app.use("/account", require("./controller/accountController.js"));
