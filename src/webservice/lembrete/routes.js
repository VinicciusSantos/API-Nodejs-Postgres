const express = require('express');
const router = express.Router();
var handlerLembrete = require('./handler')

/**
 * @swagger
 * /lembretes:
 *   post:
 *      summary: Cadastra um novo lembrete
 *      description: Lembretes podem servir para gravar datas de eventos, reuniões, etc.
 *      tags: ["Lembretes"]
 *      security: 
 *        - BearerAuth: []
 *      responses:
 *          201:
 *              description: Lembrete Criado com sucesso.
 *          401:
 *              description: Não Autorizado, faça login para continuar
 */
router.post("/", handlerLembrete.NovoLembrete)

/**
 * @swagger
 * /lembretes:
 *   get:
 *      summary: Buscar lembretes
 *      description: Retorna todos os lembretes que estão cadastrados
 *      tags: ["Lembretes"]
 *      security: 
 *        - BearerAuth: []
 *      responses:
 *          200:
 *              description: Retornando uma lista de lembretes com sucesso.
 *          401:
 *              description: Não Autorizado, faça login para continuar
 */
router.get("/", handlerLembrete.BuscarLembretes)


/**
 * @swagger
 * /lembretes/{id}:
 *   delete:
 *     summary: Apagar um Lembrete
 *     description: Apaga um lembrete
 *     tags: ["Lembretes"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da equipe
 *     responses:
 *       200:
 *         description: Lembrete apagado com sucesso.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.delete("/:id", handlerLembrete.Delete)

module.exports = router