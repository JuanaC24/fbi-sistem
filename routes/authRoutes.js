const express = require('express');
const { login, loadUsers } = require('../controllers/authController');
const verificarToken = require('../middleware/authMiddleware');
const router = express.Router();
const path = require('path');

let usuarios = [];

(async () => {
    usuarios = await loadUsers();
    console.log("Usuarios cargados:", usuarios);
})();

router.post('/login', (req, res) => login(req, res, usuarios));

router.get('/dashboard', verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'dashboard.html'));
});

router.get('/restricted', verificarToken, (req, res) => {
    if (req.user && req.user.email) {
        res.json({ mensaje: req.user.email });
    } else {
        res.status(401).json({ mensaje: "No autorizado, falta información del usuario" });
    }
});

router.get('/restricted-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'restricted.html'));
});

module.exports = router;
