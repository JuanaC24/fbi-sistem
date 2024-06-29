const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function verificarToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, SECRET_KEY, (err, authData) => {
            if (err) {
                console.error("Error al verificar el token:", err);
                res.status(403).json({ mensaje: "Token no válido o expirado" });
            } else {
                req.user = authData;
                next();
            }
        });
    } else {
        res.status(401).json({ mensaje: "No autorizado, falta token" });
    }
}

module.exports = verificarToken;
