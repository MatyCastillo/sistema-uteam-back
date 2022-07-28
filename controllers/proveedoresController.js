const mysqlConnection = require("../database/db.js");

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
    chofer_nombreTitular,
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
    chofer_nombreTitular,
    chofer_cuitTitular,
    chofer_anioMod,
  ];

  mysqlConnection.query(
    "INSERT INTO proveedores ( `prov_asoc`, `prov_dni`, `prov_nombre`, `prov_titularVehiculo`, `chofer`, `chofer_dni`, `chofer_patente`, `chofer_habilitacion`, `chofer_vtoHab`, `chofer_seguro`, `chofer_nPoliza`, `chofer_vtoPoliza`, `chofer_nVtv`, `chofer_vtoVtv`, `chofer_vehiculo`, `chofer_vehiculoCapacidad`, `chofer_cupon`, `chofer_registro`, `chofer_prorroga`, `chofer_cuitSocio`, `chofer_nombreTitular`, `chofer_cuitTitular`, `chofer_anioMod`) VALUES (?) ",
    [newRecord],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          status: "success",
          message: "New inscription created",
        });
      } else {
        res.status(500).json({
          status: "error",
          message: err,
        });
      }
    }
  );
};

exports.getAllProvs = async (req, res) => {
  try {
    mysqlConnection.query("SELECT * FROM proveedores ", (err, rows, fields) => {
      if (!err) {
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
              message: "This user was not found",
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

exports.deleteProv = async (req, res) => {
  const { idProveedor } = req.body;
  mysqlConnection.query(
    "DELETE FROM `proveedores` WHERE `id`= ?",
    idProveedor,
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          status: "success",
          message: "Provider deleted",
        });
      } else {
        res.status(500).json({
          status: "error",
          message: err,
        });
      }
    }
  );
};

exports.updateProv = async (req, res) => {
  const idToUpdate = req.params.id;
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
          message: "Provider updated",
        });
      } else {
        res.status(500).json({
          status: "error",
          message: err,
        });
      }
    }
  );
};

exports.updateImg = async (req, res) => {
  const ruta = req.file.path;
  const { img_nombre, prov_id } = req.body;
  const data = [ruta, img_nombre, prov_id];

  mysqlConnection.query(
    "INSERT INTO images (`img_path`, `img_nombre`, `prov_id`) VALUES (?)",
    [data],
    (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          status: "success",
          message: "New image created",
        });
      } else {
        res.status(500).json({
          status: "error",
          message: err,
        });
      }
    }
  );
};

exports.getImageById = async (req, res) => {
  try {
    const prov_id = req.body.prov_id;
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
