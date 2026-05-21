const express = require('express');
const router = express.Router();
const supabase = require('../services/supabase');
const verificarToken = require('../middleware/auth');
const verificarAdmin = require('../middleware/admin');

//POST - cadastrar contribuinte
router.post('/', async (req, res) => {
    const {
        nome,
        cpf_cnpj,
        email,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
    } = req.body;

// validações

    //validação de nome
    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            erro: 'Nome é obrigatório'
        });
    }

    //validação de CPF_CNPJ
    if (!cpf_cnpj || cpf_cnpj.trim() === '') {
        return res.status(400).json({
            erro: 'CPF/CNPJ é obrigatório'
        });
    }

    //validação de e-mail
    if (!email || email.trim() === '') {
    return res.status(400).json({
        erro: 'E-mail é obrigatório'
    });
    }

    // validação completa de e-mail
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValido.test(email)) {
            return res.status(400).json({
            erro: 'E-mail inválido'
        });
    }

    const { data, error } = await supabase
        .from('contribuintes')
        .insert([
            {
                nome,
                cpf_cnpj,
                email,
                logradouro,
                numero,
                bairro,
                cidade,
                uf,
                ativo: true
            }
        ])
        .select();

    if (error) {
        return res.status(400).json({
            erro: error.message
        });
    }

    res.status(201).json(data);
});

/**
 * @swagger
 * /contribuintes:
 *   get:
 *     summary: Lista contribuintes ativos
 *     tags: [Contribuintes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contribuintes
 *       401:
 *         description: Token inválido ou não informado
 */

// GET - listar contribuintes
router.get('/', verificarToken, async (req, res) => {

    try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error } = await supabase
        .from('contribuintes')
        .select('*')
        .eq('ativo', true)
        .range(start, end);

    if (error) {
        return res.status(400).json({
            erro: error.message
        });
    }

    res.status(200).json(data);

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            erro: 'Erro interno do servidor'
        });
    }
});

// GET - buscar contribuinte por ID
router.get('/:id', async (req,res) => {

    const { id } = req.params;

    const { data, error } = await supabase
        .from('contribuintes')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return res.status(400).json({
            erro: error.message
        });
    }

    if (!data) {
        return res.status(404).json({
            erro: 'Contribuinte não encontrado'
        });
    }

    res.status(200).json(data);
});

// PUT - atualização no banco
router.put('/:id', async (req, res) => {

    const { id } = req.params;

    const {
        nome,
        cpf_cnpj,
        email,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
    } = req.body;

    //validações 

    if (!nome || nome.trim() === '') {
        return res.status(400).json({
            erro: 'Nome é obrigatório'
        });
    }

    if (!cpf_cnpj || cpf_cnpj.trim() === '') {
        return res.status(400).json({
            erro: 'CPF/CNPJ é obrigatório'
        });
    }

    if (!email || email.trim() === '') {
        return res.status(400).json({
            erro: 'E-mail é obrigatório'
        });
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(email)) {
        return res.status(400).json({
            erro: 'E-mail inválido'
        });
    }

    // update

    const { data, error } = await supabase
        .from('contribuintes')
        .update({
            nome,
            cpf_cnpj,
            email,
            logradouro,
            numero,
            bairro,
            cidade,
            uf
        })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(400).json({
            erro: error.message
        });
    }

    if (data.length === 0) {
        return res.status(404).json({
            erro: 'Contribuinte não encontrado'
        });
    }

    res.status(200).json(data);
});

// DELETE - inativar contribuinte (não apagar, apenas inativar)
router.delete('/:id', verificarToken, verificarAdmin, async (req, res) => {

    const { id } = req.params;

    const { data, error } = await supabase
        .from('contribuintes')
        .update({
            ativo: false
        })
        .eq('id', id)
        .select();

    if (error) {
        return res.status(400).json({
            erro: error.message
        });
    }

    if (data.length === 0) {
        return res.status(404).json({
            erro: 'Contribuinte não encontrado'
        });
    }

    res.status(200).json({
        mensagem: 'Contribuinte desativado com sucesso'
    });
});

module.exports = router;