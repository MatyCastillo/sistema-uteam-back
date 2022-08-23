const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");
const proveedoresRoutes = require("./routes/proveedoresRoutes.js");

const app = express();

//** DESDE ACAAAA **/
var whitelist = ["http://localhost:3000/loged", "http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
//************** HASTA ACA ***************//

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/proveedores", proveedoresRoutes);

module.exports = app;
