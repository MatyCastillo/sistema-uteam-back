const mysqlConnection = require("../database/db.js");

// Función para obtener datos filtrados y ordenados
exports.getNotifications = async (req, res) => {
  const consulta = `
    SELECT id, titulo, descripcion, nivel_importancia, fecha, leida
    FROM notificaciones
    WHERE leida <> 1
    ORDER BY nivel_importancia DESC, fecha DESC;
  `;

  try {
    mysqlConnection.query(consulta, (err, filas, campos) => {
      if (!err) {
        res.status(200).json({
          status: 'success',
          data: filas,
        });
      } else {
        res.status(500).json({
          status: 'error',
          message: 'Error al obtener los datos de la base de datos.',
          error: err,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Se produjo un error inesperado, inténtelo nuevamente.',
    });
  }
};