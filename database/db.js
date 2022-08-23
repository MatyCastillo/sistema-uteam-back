const mysql = require("mysql");

let mysqlConnection;

if (process.env.NODE_ENV === "dev") {
  console.log("host", process.env.DB_HOST_LOCAL);
  console.log("user", process.env.DB_USER_LOCAL);
  console.log("pass", process.env.DB_PASSWORD_LOCAL);
  console.log("name", process.env.DB_NAME_LOCAL);

  mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST_LOCAL,
    user: process.env.DB_USER_LOCAL,
    password: process.env.DB_PASSWORD_LOCAL,
    database: process.env.DB_NAME_LOCAL,
  });
} else {
  console.log("host", process.env.DB_HOST_LOCAL);
  console.log("user", process.env.DB_USER_LOCAL);
  console.log("pass", process.env.DB_PASSWORD_LOCAL);
  console.log("name", process.env.DB_NAME_LOCAL);
  mysqlConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

mysqlConnection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Db is connected");
  }
});

module.exports = mysqlConnection;
