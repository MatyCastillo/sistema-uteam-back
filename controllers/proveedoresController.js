const mysqlConnection = require("../database/db.js");
const dateNow = new Date();
dateNow.setHours(0, 0, 0, 0);
let imgName;

exports.health = async (req, res) => {
  try {
    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      message: "The server is alive!",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "The server is not working",
    });
  }
};

exports.createNewProv = async (req, res) => {
  const {
    prov_asoc,
    prov_dni,
    prov_nombre,
    prov_titularVehiculo,
    chofer,
    chofer_dni,
    chofer_patente,
    chofer_habilitacion,
    chofer_vtoHab,
    chofer_seguro,
    chofer_nPoliza,
    chofer_vtoPoliza,
    chofer_nVtv,
    chofer_vtoVtv,
    chofer_vehiculo,
    chofer_vehiculoCapacidad,
    chofer_cupon,
    chofer_registro,
    chofer_prorroga,
    chofer_cuitSocio,
    chofer_cuitTitular,
    chofer_anioMod,
  } = req.body;

  const newRecord = [
    prov_asoc,
    prov_dni,
    prov_nombre,
    prov_titularVehiculo,
    chofer,
    chofer_dni,
    chofer_patente,
    chofer_habilitacion,
    chofer_vtoHab,
    chofer_seguro,
    chofer_nPoliza,
    chofer_vtoPoliza,
    chofer_nVtv,
    chofer_vtoVtv,
    chofer_vehiculo,
    chofer_vehiculoCapacidad,
    chofer_cupon,
    chofer_registro,
    chofer_prorroga,
    chofer_cuitSocio,
    chofer_cuitTitular,
    chofer_anioMod,
  ];

  const idAs = newRecord[0];

  try {
    mysqlConnection.query(
      "SELECT * FROM proveedores WHERE prov_asoc =  ?",
      [idAs],
      (err, result) => {
        if (result.length !== 0) {
          res.status(200).json({
            status: "error",
            message: "Id de socio ya asignado",
          });
        } else {
          mysqlConnection.query(
            "INSERT INTO proveedores ( `prov_asoc`, `prov_dni`, `prov_nombre`, `prov_titularVehiculo`, `chofer`, `chofer_dni`, `chofer_patente`, `chofer_habilitacion`, `chofer_vtoHab`, `chofer_seguro`, `chofer_nPoliza`, `chofer_vtoPoliza`, `chofer_nVtv`, `chofer_vtoVtv`, `chofer_vehiculo`, `chofer_vehiculoCapacidad`, `chofer_cupon`, `chofer_registro`, `chofer_prorroga`, `chofer_cuitSocio`,  `chofer_cuitTitular`, `chofer_anioMod`) VALUES (?) ",
            [newRecord],
            (err, rows, fields) => {
              if (!err) {
                res.status(200).json({
                  status: "success",
                  message: "Socio agregado exitosamente",
                });
              } else {
                res.status(500).json({
                  status: "error",
                  message: "Se produjo un error al intentar agregar el socio",
                });
                console.log(err);
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllProvs = async (req, res) => {
  try {
    mysqlConnection.query("SELECT * FROM proveedores ", (err, rows, fields) => {
      if (!err) {
        rows.forEach((element) => {
          let isExpired;
          if (
            element.chofer_prorroga != "0000-00-00" ||
            element.chofer_prorroga != undefined ||
            element.chofer_prorroga != null
          ) {
            element.chofer_prorroga < dateNow
              ? (isExpired = "Expired")
              : (isExpired = "NotExpired");
          } else {
            element.chofer_registro < dateNow
              ? (isExpired = "Expired")
              : (isExpired = "NotExpired");
          }
          element.chofer_vtoHab < dateNow ||
          element.chofer_vtoPoliza < dateNow ||
          element.chofer_vtoVtv < dateNow ||
          element.chofer_cupon < dateNow
            ? (isExpired = "Expired")
            : (isExpired = "NotExpired");
          element.expire = isExpired;
        });
        console.log(rows);
        console.log(dateNow);
        res.status(200).json({
          status: "success",
          data: rows,
        });
      } else {
        res.status(500).json({
          status: "error",
          message: err,
        });
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getIdProv = async (req, res) => {
  try {
    const id = req.params.id;
    mysqlConnection.query(
      "SELECT * FROM proveedores WHERE id = ?",
      [id],
      (err, rows, fields) => {
        if (!err) {
          if (rows[0]) {
            res.status(200).json({
              status: "success",
              data: rows,
            });
          } else {
            res.status(404).json({
              status: "error",
              message: "Usuario no encontrado",
            });
          }
        } else {
          res.status(500).json({
            status: "error",
            message: "Ocurrió un error inesperado, intentelo nuevamente",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteProv = async (req, res) => {
  try {
    const { idProveedor } = req.body;
    mysqlConnection.query(
      "DELETE FROM `proveedores` WHERE `id`= ?",
      idProveedor,
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json({
            status: "success",
            message: "Socio eliminado exitosamente",
          });
        } else {
          res.status(500).json({
            status: "error",
            message: "El socio no pudo ser eliminado",
          });
        }
      }
    );
  } catch (error) {
    res.status(200).json({
      status: "error",
      message: "Ocurrió un error inesperado. Intentelo nuevamente",
    });
  }
};

exports.updateProv = async (req, res) => {
  const idToUpdate = req.params.id;
  console.log(req.params.id);
  const {
    prov_asoc,
    prov_dni,
    prov_nombre,
    prov_titularVehiculo,
    chofer,
    chofer_dni,
    chofer_patente,
    chofer_habilitacion,
    chofer_vtoHab,
    chofer_seguro,
    chofer_nPoliza,
    chofer_vtoPoliza,
    chofer_nVtv,
    chofer_vtoVtv,
    chofer_vehiculo,
    chofer_vehiculoCapacidad,
    chofer_cupon,
    chofer_registro,
    chofer_prorroga,
    chofer_cuitSocio,
    chofer_nombreTitular,
    chofer_cuitTitular,
    chofer_anioMod,
  } = req.body;
  try {
    mysqlConnection.query(
      "UPDATE `proveedores` SET prov_asoc = ?, prov_dni = ?, prov_nombre = ?, prov_titularVehiculo = ?, chofer = ?, chofer_dni = ?, chofer_patente = ?, chofer_habilitacion = ?, chofer_vtoHab = ?, chofer_seguro = ?, chofer_nPoliza = ?,chofer_vtoPoliza = ?,chofer_nVtv = ?,chofer_vtoVtv = ?,chofer_vehiculo = ?,chofer_vehiculoCapacidad = ?,chofer_cupon = ?,chofer_registro = ?,chofer_prorroga = ?,chofer_cuitSocio = ?,chofer_nombreTitular = ?,chofer_cuitTitular = ?,chofer_anioMod = ? WHERE id = ?",
      [
        prov_asoc,
        prov_dni,
        prov_nombre,
        prov_titularVehiculo,
        chofer,
        chofer_dni,
        chofer_patente,
        chofer_habilitacion,
        chofer_vtoHab,
        chofer_seguro,
        chofer_nPoliza,
        chofer_vtoPoliza,
        chofer_nVtv,
        chofer_vtoVtv,
        chofer_vehiculo,
        chofer_vehiculoCapacidad,
        chofer_cupon,
        chofer_registro,
        chofer_prorroga,
        chofer_cuitSocio,
        chofer_nombreTitular,
        chofer_cuitTitular,
        chofer_anioMod,
        idToUpdate,
      ],
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json({
            status: "success",
            message: "Socio actualizado exitosamente",
          });
        } else {
          res.status(500).json({
            status: "error",
            message: "No se pudo actualizar",
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Ocurrió un error inesperado, intentelo nuevamente",
    });
  }
};

exports.updateImg = async (req, res) => {
  const ruta = req.file.filename;
  const { img_nombre, prov_id } = req.body;
  const data = [ruta, img_nombre, prov_id];
  mysqlConnection.query(
    "INSERT INTO images (`img_path`, `img_nombre`, `prov_id`) VALUES (?)",
    [data],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          status: "success",
          message: "Imagen guardada correctamente",
        });
      } else {
        res.status(500).json({
          status: "error",
          message: `La imagen ${img_nombre} no pudo ser guardad`,
        });
      }
    }
  );
};

exports.getImageById = async (req, res) => {
  try {
    const prov_id = req.params.prov_id;
    mysqlConnection.query(
      "SELECT img_path, img_nombre FROM images WHERE prov_id = ?",
      [prov_id],
      (err, rows, fields) => {
        if (!err) {
          if (rows[0]) {
            res.status(200).json({
              status: "success",
              data: rows,
            });
          } else {
            res.status(404).json({
              status: "error",
              message: "Image was not found",
            });
          }
        } else {
          res.status(500).json({
            status: "error",
            message: err,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
