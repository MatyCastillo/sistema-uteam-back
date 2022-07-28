const mysqlConnection = require("../database/db");
const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
    try {
        let token;
        if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        ) {
        token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            res.status(401).json({
                message: '¡Usted no se ha identificado! Por favor inicie sesión para obtener acceso',
            });
        } else {
            const decoded = jwt.verify(token, process.env.SECRET);

            mysqlConnection.query('SELECT * FROM usuarios WHERE nombre = ?', decoded.nombre, (err, user, fields) => {
                if (!err) {
                    if(!user[0]){
                        return res.status(401).json({ message: 'El token que pertenece a este usuario ya no existe' });
                    }
                    req.user = user
                    next();
                } else {
                    console.log(err);
                }
            });
        }    
        
    } catch (err) {
        res.status(500).json({
            message: "Hubo un error",
            error: err
        });
    }
}