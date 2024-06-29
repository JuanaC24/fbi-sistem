const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

async function loadUsers() {
    const usuarios = await require('../data/agentes.js')();
    return usuarios;
}

async function login(req, res, usuarios) {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!usuario) {
        return res.status(401).send('Credenciales no válidas - Usuario no encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (passwordMatch) {
        const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET_KEY, { expiresIn: '2m' });
        res.json({ mensaje: "Autenticación exitosa", token, email: usuario.email });
    } else {
        res.status(401).send('Credenciales no válidas - Contraseña incorrecta');
    }
}

module.exports = {
    login,
    loadUsers,
};
