const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const supabase = require('../services/supabase');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário ou senha inválidos
 */

router.post('/login', async (req, res) => {

    try {
    
        const { email, senha } = req.body;

        // buscar usuario 

        const { data: usuario, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .eq('ativo', true)
            .single();

        if (error || !usuario) {
            return res.status(401).json({
                erro: 'Usuário ou senha inválidos'
        });
    }

        // verificar senha

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha_hash
        );
    
        if (!senhaValida) {
            return res.status(401).json({
                erro: 'Usuário ou senha inválidos'
            });
        }

        // gerar token

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email,
                cargo: usuario.cargo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.status(200).json({
            token
        });
        } catch (err) {

        console.error(err);

        return res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
});

module.exports = router;