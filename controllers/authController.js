const mysqlConnection = require("../database/db.js");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  try {
    const { nombre, email, password, userType } = req.body;
    const user = { nombre, email, password, userType };
    mysqlConnection.query("INSERT INTO usuarios SET ?", user);

    const token = jwt.sign({ nombre: user.nombre }, process.env.SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });
    console.log(token);

    res.status(200).json({
      status: "success",
      message: "User Registered",
      authToken: token,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });

    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { nombre, password } = req.body;

    if (!nombre || !password) {
      return res.status(400).json({
        status: "no credentials",
        message: "Provide name and password",
      });
    } else {
      mysqlConnection.query(
        "SELECT * FROM usuarios WHERE nombre = ?",
        nombre,
        (err, user, fields) => {
          if (user.length === 0) {
            return res
              .status(401)
              .json({ status: "user error", message: "Incorrect user" });
          } else {
            if (!err) {
              //const correct = await bcrypt.compare(contraseña, users[0].contraseña);
              if (user[0].password !== password) {
                return res.status(401).json({
                  status: "incorrect credentials",
                  message: "Incorrect name or password",
                });
              } else {
                const token = jwt.sign({ nombre: nombre }, process.env.SECRET, {
                  expiresIn: process.env.EXPIRES_IN,
                });

                res.status(200).json({
                  status: "success",
                  jwt: token,
                  userNombre: nombre,
                  userType: user[0].userType,
                });
              }
            } else {
              res.status(500).json({
                status: "error",
                message: err,
              });
            }
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};
