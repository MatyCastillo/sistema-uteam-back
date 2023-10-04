const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes.js");
const proveedoresRoutes = require("./routes/proveedoresRoutes.js");
const proveedoresRoutes_provincial = require("./routes/proveedoresRoutes_provincial.js");
const notificacionesRoutes = require("./routes/notificationsRoutes.js")

const app = express();

//** DESDE ACAAAA **/
var whitelist = [
  "http://10.10.1.146:3000/loged",
  "http://10.10.1.146:3000",
  "http://localhost:3000/loged",
  "http://localhost:3000",
  "http://localhost:3000/documentacion",
];
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
app.use("/api/v1/proveedores_provincial", proveedoresRoutes_provincial);
app.use("/api/v1/notificaciones", notificacionesRoutes);

module.exports = app;
