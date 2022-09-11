const express = require('express')
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../../middlewares/multer');
const handlerEquipe = require('./handler')

/**
 * @swagger
 * /equipes/fotos:
 *   get:
 *     description: Retorna os links com todas as fotos de perfil pré-definidas para equipes!
 *     responses:
 *       200:
 *         description: Retorna uma lista de links de fotos.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.get("/fotos", handlerEquipe.BuscarFotos)

/**
 * @swagger
 * /equipes/fotos:
 *   post:
 *     description: Permite adicionar uma nova foto de perfil que poderá ser usada por uma equipe!
 *     responses:
 *       200:
 *         description: Retorna uma lista de links de fotos.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.post("/fotos", multer(multerConfig).single('foto'), handlerEquipe.AddFoto)

/**
 * @swagger
 * /equipes:
 *   post:
 *     description: Permite criar uma nova equipe!
 *     responses:
 *       200:
 *         description: Retorna uma lista de links de fotos.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.post("/", handlerEquipe.NovaEquipe)

/**
 * @swagger
 * /equipes:
 *   get:
 *     description: Busca todas as equipes cadastradas!
 *     responses:
 *       200:
 *         description: Retorna uma lista de equipes.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.get("/", handlerEquipe.BuscarEquipes)

/**
 * @swagger
 * /equipes/{id}:
 *   get:
 *     description: Busca uma equipe específica pelo ID dela!
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da equipe
 *     responses:
 *       200:
 *         description: Retorna uma lista de equipes.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.get("/:id", handlerEquipe.BuscarPorId)

/**
 * @swagger
 * /equipes/{id}:
 *   put:
 *     description: Busca todas as equipes cadastradas!
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da equipe
 *     responses:
 *       200:
 *         description: Retorna a equipe com as edições feitas.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.put("/:id", handlerEquipe.Edit)

/**
 * @swagger
 * /equipes/{id}:
 *   delete:
 *     description: Apaga uma Equipe!
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da equipe
 *     responses:
 *       200:
 *         description: Equipe apagada com sucesso.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.delete("/:id", handlerEquipe.Delete)

/**
 * @swagger
 * /equipes/{eq}/pessoas/{pe}:
 *   post:
 *     description: Associa pessoas com uma equipe!
 *     parameters:
 *          -   in: path
 *              name: eq
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da equipe
 *          -   in: path
 *              name: pe
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da pessoa
 *     responses:
 *       200:
 *         description: Retorna uma lista de equipes.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.post("/:eq/pessoas/:pe", handlerEquipe.AssociaPessoa)

module.exports = router