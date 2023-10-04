const mysqlConnection = require("../database/db.js");
const mysql = require("mysql2");
const dateNow = new Date();
const { format } = require("date-fns");
dateNow.setHours(0, 0, 0, 0);
const fs = require("fs");
const PDFDocument = require("pdfkit");
let imgName;
const path = require("path");
const uuid = require("uuid");
const ExcelJS = require("exceljs");

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
    habilitacion_colonia,
    vtoHabilitacion_colonia,
    tipo_habilitacion
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
    habilitacion_colonia,
    vtoHabilitacion_colonia,
    tipo_habilitacion
  ];

  const idAs = newRecord[0];

  try {
    mysqlConnection.query(
      "SELECT * FROM proveedores_provincial WHERE prov_asoc =  ?",
      [idAs],
      (err, result) => {
        if (result.length !== 0) {
          res.status(200).json({
            status: "error",
            message: "Id de socio ya asignado",
          });
        } else {
          try {
            mysqlConnection.query(
              "INSERT INTO proveedores_provincial ( `prov_asoc`, `prov_dni`, `prov_nombre`, `prov_titularVehiculo`, `chofer`, `chofer_dni`, `chofer_patente`, `chofer_habilitacion`, `chofer_vtoHab`, `chofer_seguro`, `chofer_nPoliza`, `chofer_vtoPoliza`, `chofer_nVtv`, `chofer_vtoVtv`, `chofer_vehiculo`, `chofer_vehiculoCapacidad`, `chofer_cupon`, `chofer_registro`, `chofer_prorroga`, `chofer_cuitSocio`,  `chofer_cuitTitular`, `chofer_anioMod`,`habilitacion_colonia`,`vtoHabilitacion_colonia`,`tipo_habilitacion`) VALUES (?) ",
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
                  console.log("error al agregar", err);
                }
              }
            );
          } catch (error) {
            console.log("entro al catch");
            res.status(500).json({
              status: "error",
              message:
                "Verifique que todos los campos obligatorios(*) están completos",
              error: error,
            });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Se produjo inesperado, vuelva a intentarlo ",
    });
  }
};

exports.getDeleteProvs = async (req, res) => {
  try {
    mysqlConnection.query(
      "SELECT * FROM proveedores_provincial  WHERE eliminado = 1",
      (err, rows, fields) => {
        if (!err) {
          rows.forEach((element) => {
            let isExpired;
            if (
              element.chofer_prorroga != "0000-00-00" &&
              element.chofer_prorroga != undefined &&
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
            if (isExpired === "NotExpired") {
              element.chofer_vtoHab < dateNow ||
              element.chofer_vtoPoliza < dateNow ||
              element.chofer_vtoVtv < dateNow ||
              element.chofer_cupon < dateNow
                ? (isExpired = "Expired")
                : (isExpired = "NotExpired");
            }
            element.expire = isExpired;
          });
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
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllProvs = async (req, res) => {
  try {
    mysqlConnection.query(
      "SELECT * FROM proveedores_provincial  WHERE eliminado = 0 ORDER BY CAST(prov_asoc AS INT) ASC",
      (err, rows, fields) => {
        if (!err) {
          rows.forEach((element) => {
            let imageStatus = false;
            let isExpired;
            if (
              element.chofer_prorroga != "0000-00-00" &&
              element.chofer_prorroga != undefined &&
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
            if (isExpired === "NotExpired") {
              element.chofer_vtoHab < dateNow ||
              element.chofer_vtoPoliza < dateNow ||
              element.chofer_vtoVtv < dateNow ||
              element.chofer_cupon < dateNow
                ? (isExpired = "Expired")
                : (isExpired = "NotExpired");
            }
            imageStatus = getImagesStatus(element.prov_asoc);
          
            // element.imagesStatus = imageStatus;
            element.expire = isExpired;
          });
          //console.log(rows);
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
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getIdProv = async (req, res) => {
  try {
    const id = req.params.id;
    mysqlConnection.query(
      "SELECT * FROM proveedores_provincial WHERE id = ?",
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
      "DELETE FROM `proveedores_provincial` WHERE `id`= ?",
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

exports.markAsDeleted = async (req, res) => {
  const {
    id,
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
    eliminado,
  } = req.body;
  try {
    mysqlConnection.query(
      "UPDATE `proveedores_provincial` SET prov_asoc = ?, prov_dni = ?, prov_nombre = ?, prov_titularVehiculo = ?, chofer = ?, chofer_dni = ?, chofer_patente = ?, chofer_habilitacion = ?, chofer_vtoHab = ?, chofer_seguro = ?, chofer_nPoliza = ?,chofer_vtoPoliza = ?,chofer_nVtv = ?,chofer_vtoVtv = ?,chofer_vehiculo = ?,chofer_vehiculoCapacidad = ?,chofer_cupon = ?,chofer_registro = ?,chofer_prorroga = ?,chofer_cuitSocio = ?,chofer_nombreTitular = ?,chofer_cuitTitular = ?,chofer_anioMod = ?,eliminado = ? WHERE id = ?",
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
        eliminado,
        id,
      ],
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json({
            status: "success",
            message: "Socio eliminado exitosamente",
          });
        } else {
          res.status(500).json({
            status: "error",
            message: "No se pudo eliminar",
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
    habilitacion_colonia,
    vtoHabilitacion_colonia,
    tipo_habilitacion,
    eliminado,
  } = req.body;
  try {
    mysqlConnection.query(
      "UPDATE `proveedores_provincial` SET prov_asoc = ?, prov_dni = ?, prov_nombre = ?, prov_titularVehiculo = ?, chofer = ?, chofer_dni = ?, chofer_patente = ?, chofer_habilitacion = ?, chofer_vtoHab = ?, chofer_seguro = ?, chofer_nPoliza = ?,chofer_vtoPoliza = ?,chofer_nVtv = ?,chofer_vtoVtv = ?,chofer_vehiculo = ?,chofer_vehiculoCapacidad = ?,chofer_cupon = ?,chofer_registro = ?,chofer_prorroga = ?,chofer_cuitSocio = ?,chofer_nombreTitular = ?,chofer_cuitTitular = ?,chofer_anioMod = ?, habilitacion_colonia = ?,vtoHabilitacion_colonia = ?,tipo_habilitacion = ? ,eliminado = ? WHERE id = ?",
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
        habilitacion_colonia,
        vtoHabilitacion_colonia,
        tipo_habilitacion,
        eliminado,
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
  const { img_nombre, prov_id } = req.body;
  const ruta = `${prov_id}-${img_nombre}-${uuid.v4()}`;
  const data = [ruta, img_nombre, prov_id];
  console.log("req", req);
  var test = async () => {
    sharp(req.file.buffer)
      .resize(400)
      .toFormat("jpeg")
      .toFile(`images/${ruta}.jpg`);

    // const resizedImage = processedImage.resize(800, 100, { fit: "contain" });

    //  const resizedImageBuffer = await processedImage.toBuffer();

    //fs.writeFileSync(`images/${ruta}.jpeg`, processedImage);
  };

  //test();

  // async function (req, res) {
  //   const processedImage = await sharp(req.file.buffer)
  //     .resize(200, 200, { fit: "contain" })
  //     .toFormat("jpeg")
  //     .toBuffer();

  //   // const resizedImage = processedImage.resize(800, 100, { fit: "contain" });

  //   //  const resizedImageBuffer = await processedImage.toBuffer();

  //   fs.writeFileSync(`images/${ruta}.jpeg`, processedImage);

  //   res.send("hola desde el post de imagen");
  // },

  // try {
  //   mysqlConnection.query(
  //     "INSERT INTO images (`img_path`, `img_nombre`, `prov_id`) VALUES (?)",
  //     [data],
  //     (err, rows, fields) => {
  //       if (!err) {
  //         res.status(200).json({
  //           status: "success",
  //           message: "Imagen guardada correctamente",
  //         });
  //       } else {
  //         res.status(500).json({
  //           status: "error",
  //           message: `La imagen ${img_nombre} no pudo ser guardada`,
  //         });
  //       }
  //     }
  //   );
  // } catch (error) {
  //   res.status(500).json({
  //     status: "error",
  //     message: "Ocurrió un error inesperado, intentelo nuevamente",
  //   });
  // }
};

exports.updateImgById = async (req, res) => {
  try {
    console.log("file", req.file);
    const ruta = req.file.filename;
    const { img_nombre, prov_id } = req.body;
    const data = [ruta, img_nombre, prov_id];
    mysqlConnection.query(
      "SELECT * FROM images_provincial WHERE img_nombre= ? && prov_id=? ",
      [img_nombre, prov_id],
      (err, result) => {
        console.log("error", err);
        if (result.length !== 0) {
          console.log("entro al if", result.length);
          // try {
          //   console.log("trata de eliminar");
          //   // fs.unlinkSync(`./images/${result[0].img_path}`);
          // } catch (error) {
          //   console.log("Error al intentar reemplazar el archivo");
          //   res.status(500).json({
          //     status: "error",
          //     message: "Error al intentar reemplazar el archivo",
          //     error: error,
          //   });
          // }
          // mysqlConnection.query(
          //   "UPDATE images SET img_path = ? WHERE img_nombre= ? AND prov_id= ?",
          //   [ruta, img_nombre, prov_id],
          //   (err, rows, fields) => {
          //     if (!err) {
          //       res.status(200).json({
          //         status: "success",
          //         message: "la imagen fué reemplazada",
          //       });
          //     } else {
          //       res.status(500).json({
          //         status: "error",
          //         message: `La imagen ${img_nombre} no pudo ser guardada`,
          //         error: err,
          //       });
          //     }
          //   }
          // );
          // console.log("data", data);

          fs.promises
            .unlink(`./images/${result[0].img_path}`)
            .then(() => {
              console.log("Archivo borrado exitosamente");
              mysqlConnection.query(
                "UPDATE images_provincial SET img_path = ? WHERE img_nombre= ? && prov_id=?",
                [ruta, img_nombre, prov_id],
                (err, rows, fields) => {
                  if (!err) {
                    res.status(200).json({
                      status: "success",
                      message: "la imagen fué reemplazada",
                    });
                  } else {
                    res.status(500).json({
                      status: "error",
                      message: `La imagen ${img_nombre} no pudo ser guardada`,
                      error: err,
                    });
                  }
                }
              );
            })
            .catch((error) => {
              console.log("Error al intentar reemplazar el archivo");
              res.status(500).json({
                status: "error",
                message: "Error al intentar reemplazar el archivo",
                error: error,
              });
            });
        } else {
          mysqlConnection.query(
            "INSERT INTO images_provincial (`img_path`, `img_nombre`, `prov_id`) VALUES (?)",
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
                  message: `La imagen ${img_nombre} no pudo ser guardada`,
                });
              }
            }
          );
        }
      }
    );
  } catch {
    res.status(500).json({
      status: "error",
      message: "Se produjo inesperado, vuelva a intentarlo ",
    });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const prov_id = req.params.prov_id;
    mysqlConnection.query(
      "SELECT img_path, img_nombre FROM images_provincial WHERE prov_id = ?",
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

const getImagesStatus = async (prov_id) => {
  var sql = "SELECT img_path, img_nombre FROM images_provincial WHERE prov_id = ?";
  const results = await mysqlConnection.promise().query(sql, [prov_id]);

  let imgUploads = results[0].map((e) => e.img_nombre);
  const response = imgUploads.includes(
    "dniTitF",
    "dniTitD",
    "dniChofF",
    "dniChofD",
    "hab1",
    "pol1",
    "seg1",
    "regTitF",
    "regTitD",
    "regChofF",
    "regChofD",
    "vtv",
    "cedulaVerdeFront",
    "cedulaVerdeBack"
  );
  return response;
};

exports.getImagesStatus2 = async (req, res) => {
  try {
    const prov_id = req.params.prov_id;
    mysqlConnection.query(
      "SELECT img_path, img_nombre FROM images_provincial WHERE prov_id = ?",
      [prov_id],
      (err, rows, fields) => {
        if (!err) {
          if (rows[0]) {
            let imgUploads = rows.map((e) => e.img_nombre);
            const response = imgUploads.includes(
              "dniTitF",
              "dniTitD",
              "dniChofF",
              "dniChofD",
              "hab1",
              "pol1",
              "seg1",
              "regTitF",
              "regTitD",
              "regChofF",
              "regChofD",
              "vtv",
              "cedulaVerdeFront",
              "cedulaVerdeBack"
            );

            res.status(200).json({
              status: "success",
              data: response,
            });
          } else {
            res.status(200).json({
              status: "error",
              message: "Image was not found",
              data: false,
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

exports.getYears = async (req, res) => {
  try {
    mysqlConnection.query(
      "SELECT chofer_anioMod FROM proveedores_provincial ORDER BY CAST(chofer_anioMod AS INT) ASC",
      async (err, rows, fields) => {
        let ages = [];
        let ret = [];
        rows.forEach((e) =>
          e.chofer_anioMod !== 0
            ? ages.push(e.chofer_anioMod)
            : ages.push("No ingresado")
        );

        const specimens = ages.filter((year, i) =>
          i == 0 ? true : ages[i - 1] != year
        );

        const counterYears = specimens.map((spec) => {
          return { year: spec, count: 0, partners: [] };
        });

        const arr = async (y) => await getByYear2(y);

        counterYears.map((countSpec, i) => {
          const actualSpecLength = ages.filter(
            (year) => year === countSpec.year
          ).length;
          countSpec.count = actualSpecLength;
        });
        for (const element of counterYears) {
          element.partners = await arr(element.year);
        }
        // retorno
        res.status(200).json({
          status: "success",
          data: counterYears,
        });
      }
    );
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
};

exports.getByYear = async (req, res) => {
  try {
    const year = req.params.year === "No Ingresado" ? 0 : req.params.year;
    mysqlConnection.query(
      "SELECT * FROM proveedores_provincial WHERE chofer_anioMod = ?",
      [year],
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
            error: err,
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

async function getByYear2(year) {
  var sql = "SELECT * FROM proveedores_provincial WHERE chofer_anioMod = ?";
  const results = await mysqlConnection.promise().query(sql, [year]);
  return results[0];
}

async function getInfo(data) {
  var sql = "SELECT * FROM proveedores_provincial WHERE id = ?";
  const results = await mysqlConnection.promise().query(sql, [data]);
  return results[0];
}

async function getImgs(id) {
  var sql = "SELECT img_path, img_nombre FROM images_provincial WHERE prov_id = ?";
  const results = await mysqlConnection.promise().query(sql, [id]);
  return results[0];
}

/* exports.getRecordsBetweenDates = async (req, res) => {
  const query = `
  SELECT *
  FROM proveedores_provincial
  WHERE
    (chofer_vtoHab BETWEEN ? AND ?)
    AND
    (chofer_vtoPoliza BETWEEN ? AND ?)
    AND
    (chofer_vtoVtv BETWEEN ? AND ?)
    AND
    (chofer_cupon BETWEEN ? AND ?)
    AND
    (chofer_registro BETWEEN ? AND ?)
`;

  try {
    const { startDate, endDate } = req.body; // Suponiendo que las fechas vienen en el cuerpo de la solicitud

    // Validación de las fechas
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: "error",
        message: "Falta proporcionar las fechas de inicio y fin.",
      });
    }

    // Convertir las fechas a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Asegurarse de que la fecha de inicio sea anterior o igual a la fecha de fin
    if (start > end) {
      return res.status(400).json({
        status: "error",
        message: "La fecha de inicio debe ser anterior o igual a la fecha de fin.",
      });
    }

    // Realizar la consulta a la base de datos para obtener los registros entre las fechas
    mysqlConnection.query(query,
      [start, end,start, end,start, end,start, end,start, end],
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json({
            status: "success",
            data: rows,
          });
        } else {
          res.status(500).json({
            status: "error",
            message: "Error al obtener los registros entre las fechas.",
            error: err,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Se produjo un error inesperado, intentelo nuevamente.",
    });
  }
}; */
exports.getRecordsBetweenDates = async (req, res) => {
  const query = `
  SELECT *,
  (CASE
    WHEN chofer_vtoHab >= CURDATE() AND chofer_vtoPoliza >= CURDATE() AND chofer_vtoVtv >= CURDATE() AND chofer_cupon >= CURDATE()  THEN 0
    ELSE 1 -- valor de 0 cuando NO esté expirado y un valor de 1 cuando esté expirado
  END) AS expired
  FROM proveedores_provincial
  WHERE
    (chofer_vtoHab BETWEEN ? AND ?)
    AND
    (chofer_vtoPoliza BETWEEN ? AND ?)
    AND
    (chofer_vtoVtv BETWEEN ? AND ?)
    AND
    (chofer_cupon BETWEEN ? AND ?)

  ORDER BY expired ASC  , 
    (CASE
      WHEN chofer_vtoHab >= CURDATE() AND chofer_vtoPoliza >= CURDATE() AND chofer_vtoVtv >= CURDATE() AND chofer_cupon >= CURDATE()  THEN chofer_vtoHab
      ELSE chofer_vtoPoliza
    END) ASC;
`;

  try {
    const { startDate, endDate } = req.body; // las fechas vienen en el cuerpo de la solicitud

    // Validación de las fechas
    if (!startDate || !endDate) {
      return res.status(400).json({
        status: "error",
        message: "Falta proporcionar las fechas de inicio y/o fin.",
      });
    }

    // Convertir las fechas a objetos Date
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Asegurarse de que la fecha de inicio sea anterior o igual a la fecha de fin
    if (start > end) {
      return res.status(400).json({
        status: "error",
        message: "La fecha de inicio debe ser anterior o igual a la fecha de fin.",
      });
    }
    console.log('start',start)
    // Realizar la consulta a la base de datos para obtener los registros entre las fechas
    mysqlConnection.query(
      query,
      [
        start,
        end,
        start,
        end,
        start,
        end,
        start,
        end
      ],
      (err, rows, fields) => {
        if (!err) {
          res.status(200).json({
            status: "success",
            data: rows,
          });
        } else {
          res.status(500).json({
            status: "error",
            message: "Error al obtener los registros entre las fechas.",
            error: err,
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Se produjo un error inesperado, inténtelo nuevamente.",
    });
  }
};




exports.getPdf = async (req, res) => {
  const doc = new PDFDocument({ bufferPage: true });
  const id = req.params.user;

  const prov = await getInfo(id);

  const images = await getImgs(prov[0].prov_asoc);
  console.log("images", images);

  let filename = "test";
  // Stripping special characters
  filename = encodeURIComponent(filename) + ".pdf";
  // Setting response to 'attachment' (download).
  // If you use 'inline' here it will automatically open the PDF
  // res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
  // res.setHeader('Content-type', 'application/pdf')
  //doc.text(`hello from the backend ${id} ${prov[0].prov_nombre}`);
  // doc.text(prov[0].prov_nombre);
  // doc.text(cualquiera)
  //doc.end();
  //doc.pipe(res);
  toPdf(prov[0], res, images);
};

//funciones para generar el pdf

const parceDate = (date) => {
  const newDate = new Date(date);
  return format(newDate, "dd/MM/yyyy");
};

function toPdf(socio, res, imgs) {
  const prov_images = imgs;
  const header = "./static/media/encabezado.jpg";
  const footer = "./static/media/footer.jpg";
  const test = prov_images.find((img) => img.img_nombre === "pol1").img_path;
  let filename = "test";
  res.setHeader(
    "Content-disposition",
    'attachment; filename="' + filename + '"'
  );
  res.setHeader("Content-type", "application/pdf");

  const doc = new PDFDocument({ bufferPage: true });
  console.log("test", test);
  doc.text(test);

  // Poliza de seguro hoja 1 - inicio
  try {
    const pol1 = `${URLdev}${
      prov_images.find((img) => img.img_nombre === "pol1").img_path
    }`;
    doc.image(header, 0, 0, { width: 600 });

    doc.moveDown(2);
    doc.font("Helvetica").fontSize(15).text("Poliza (Hoja 1)", {
      width: 450,
      align: "center",
      underline: true,
    });
    try {
      doc
        .image(pathImg, 0, 130, {
          fit: [600, 600],
          align: "center",
          valign: "center",
        })
        .stroke();
    } catch (err) {
      console.log("error", err);
    }
    doc.image(footer, 0, 750, { width: 600 });
    doc.addPage();
  } catch (error) {}
  // Poliza de seguro hoja 1 - fin

  // Poliza de seguro hoja 2 - inicio
  try {
    const polizaHoja2 = `${URLdev}${
      prov_images.find((img) => img.img_nombre === "pol2").img_path
    }`;
    doc.image(header, 0, 0, { width: 600 });
    doc.moveDown(2);
    doc.font("Helvetica").fontSize(15).text("Poliza (Hoja 2)", {
      width: 450,
      align: "center",
      underline: true,
    });
    try {
      doc
        .image(polizaHoja2, 0, 130, {
          fit: [600, 600],
          align: "center",
          valign: "center",
        })
        .stroke();
    } catch (err) {
      console.log("error", err);
    }
    doc.image(footer, 0, 750, { width: 600 });
  } catch (error) {}
  // Poliza de seguro hoja 2 - fin

  // Seguro hoja 1 - inicio
  try {
    doc.addPage().image(header, 0, 0, { width: 600 });

    doc.moveDown(2);
    doc.font("Helvetica").fontSize(15).text("Seguro (Hoja 1)", {
      width: 450,
      align: "center",
      underline: true,
    });
    try {
      doc
        .image(pathImg, 0, 130, {
          fit: [600, 600],
          align: "center",
          valign: "center",
        })
        .stroke();
    } catch (err) {
      console.log("error", err);
    }
    doc.image(footer, 0, 750, { width: 600 });
  } catch (error) {
    console.log("error", error);
  }
  // Seguro hoja 1 - fin

  // Seguro hoja 2 - inicio
  try {
    doc.addPage().image(header, 0, 0, { width: 600 });

    doc.moveDown(2);
    doc.font("Helvetica").fontSize(15).text("Seguro (Hoja 2)", {
      width: 450,
      align: "center",
      underline: true,
    });
    try {
      doc
        .image(pathImg, 0, 130, {
          fit: [600, 600],
          align: "center",
          valign: "center",
        })
        .stroke();
    } catch (err) {
      console.log("error", err);
    }
    doc.image(footer, 0, 750, { width: 600 });
  } catch (error) {
    console.log("error", error);
  }
  // Seguro hoja 2 - fin

  // VTV - inicio
  doc.addPage().image(header, 0, 0, { width: 600 });

  doc.moveDown(2);
  doc.font("Helvetica").fontSize(15).text("Verificación Técnica", {
    width: 450,
    align: "center",
    underline: true,
  });
  try {
    doc
      .image("image/vtv2.jpeg", 0, 130, {
        fit: [600, 600],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }
  doc.image(footer, 0, 750, { width: 600 });
  // VTV - fin

  // Documentos - inicio
  doc.addPage().image(header, 0, 0, { width: 600 });

  doc.moveDown(2);
  doc.font("Helvetica").fontSize(15).text("Cedula Verde", {
    width: 450,
    align: "center",
    underline: true,
  });
  try {
    doc
      .image("image/dni.jpg", 50, 100, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }
  try {
    doc
      .image("image/dni2.jpg", 300, 100, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }

  doc.moveDown(11);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Registro de Conducir - Chofer - Titular", {
      width: 450,
      align: "center",
      underline: true,
    });
  try {
    doc
      .image("image/dni.jpg", 50, 320, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }
  try {
    doc
      .image("image/dni2.jpg", 300, 320, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }

  doc.moveDown(12);
  doc.font("Helvetica").fontSize(15).text("DNI del Chofer - Titular", {
    width: 450,
    align: "center",
    underline: true,
  });
  try {
    doc
      .image("image/dni2.jpg", 50, 550, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }
  try {
    doc
      .image("image/dni2.jpg", 300, 550, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }

  doc.image(footer, 0, 750, { width: 600 });
  // Documentos - fin

  // Documentos - inicio
  doc.addPage().image(header, 0, 0, { width: 600 });

  doc.moveDown(2);
  doc.font("Helvetica").fontSize(15).text("DNI del Chofer", {
    width: 450,
    align: "center",
    underline: true,
  });
  try {
    doc
      .image("image/dni.jpg", 50, 100, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }
  try {
    doc
      .image("image/dni2.jpg", 300, 100, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }

  doc.moveDown(11);
  doc.font("Helvetica").fontSize(15).text("Registro de Conducir - Chofer", {
    width: 450,
    align: "center",
    underline: true,
  });
  try {
    doc
      .image("image/dni.jpg", 50, 320, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }
  try {
    doc
      .image("image/dni2.jpg", 300, 320, {
        fit: [200, 200],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }

  doc.image(footer, 0, 750, { width: 600 });
  // Documentos - fin

  // Habilitaciones - inicio
  doc.addPage().image(header, 0, 0, { width: 600 });

  doc.moveDown(2);
  doc.font("Helvetica").fontSize(15).text("Frente de Habilitación Matanza", {
    width: 450,
    align: "center",
    underline: true,
  });
  try {
    doc
      .image("image/dni.jpg", 50, 50, {
        fit: [450, 450],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }

  doc.moveDown(18);
  doc.font("Helvetica").fontSize(15).text("Dorso de Habilitación Matanza", {
    width: 450,
    align: "center",
    underline: true,
  });
  try {
    doc
      .image("image/dni.jpg", 50, 380, {
        fit: [450, 450],
        align: "center",
        valign: "center",
      })
      .stroke();
  } catch (err) {
    console.log("error", err);
  }

  doc.image(footer, 0, 750, { width: 600 });
  // Habilitaciones - fin

  //Padron - inicio
  doc.addPage().image(header, 0, 0, { width: 600 });

  doc.moveDown(2);
  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .text("Socio N°:", 25, 120, {
      continued: true,
      align: "left",
    })
    .text(`   ${socio.prov_asoc}`, {
      underline: false,
    });

  doc.moveDown(3);
  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .text("DATOS PERSONALES DEL CHOFER", 70, 150, {
      width: 450,
      align: "center",
      underline: true,
    });

  doc.moveDown(3);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Apellido y Nombre:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer}`);
  doc.moveDown(2);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Tipo y N° de Documento:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_dni}`, {
      underline: false,
    });
  doc.moveDown(2);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Lic. de Conducir:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_dni}`, {
      underline: false,
    });

  doc.image(footer, 0, 750, { width: 600 });

  doc.moveDown(2);
  doc.font("Helvetica-Bold").fontSize(15).text("DATOS DEL VEHICULO", {
    width: 450,
    align: "center",
    underline: true,
  });
  doc.moveDown(2);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Titular Vehiculo:", 40, 450, {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.prov_titularVehiculo}`, {
      underline: false,
    });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Vehiculo:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_vehiculo}`, {
      underline: false,
      continued: true,
    })
    .text(`Patente:`, 225, 485, {
      underline: false,
      continued: true,
    })
    .text(`   ${socio.chofer_patente}`, { underline: false });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Cia. de Seguro:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_seguro}`, {
      underline: false,
    });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Poliza N°:", {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_nPoliza}`, {
      underline: false,
    })
    .text(`Vto.:`, 350, 555, {
      underline: false,
      continued: true,
    })
    .text(`   ${parceDate(socio.chofer_vtoPoliza)}`, { underline: false });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Habilitacion Municipal:", 40, 590, {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_habilitacion}`, {
      underline: false,
    })
    .text(`Vto.:`, 350, 590, {
      underline: false,
      continued: true,
    })
    .text(`   ${parceDate(socio.chofer_vtoHab)}`, { underline: false });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Certificado Técnico:", 40, 625, {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_nVtv}`, { underline: false })
    .text(`Vto.:`, 350, 625, {
      underline: false,
      continued: true,
    })
    .text(`   ${parceDate(socio.chofer_vtoVtv)}`, { underline: false });

  doc.moveDown(1);
  doc
    .font("Helvetica")
    .fontSize(15)
    .text("Capacidad:", 40, 660, {
      width: 450,
      continued: true,
    })
    .text(`   ${socio.chofer_vehiculoCapacidad}`, { underline: false });

  //Padron - fin
  doc.end();
  doc.pipe(res);
}
  