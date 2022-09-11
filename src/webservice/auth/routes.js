const express = require('express');
const router = express.Router();
var handlerAuth = require('./handler')

/**
 * @swagger
 * /auth/cadastro:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     description: Cadastra um novo usuário
 *     tags: ["Auth"]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Usuario - Cadastro'
 *     responses:
 *       200:
 *         description: Retorna uma lista de equipes.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.post("/cadastro", handlerAuth.Cadastro)


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do Usuário
 *     description: Login do Usuário
 *     tags: ["Auth"]
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Usuario - Login'
 *     responses:
 *       200:
 *         description: Retorna uma lista de equipes.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.post("/login", handlerAuth.Login)

module.exports = router