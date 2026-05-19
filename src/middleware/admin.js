function verificarAdmin(req, res, next) {

    if (req.usuario.cargo !== 'ADMIN') {
        return res.status(403).json({
            erro: 'Acesso negado'
        });
    }

    next();
}

module.exports = verificarAdmin;