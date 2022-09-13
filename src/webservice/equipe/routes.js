const express = require('express')
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../../middlewares/multer');
const handlerEquipe = require('./handler')

/**
 * @swagger
 * /equipes/fotos:
 *   get:
 *     summary: Buscar Fotos de Equipes
 *     description: Retorna os links com todas as fotos de perfil pré-definidas para equipes!
 *     tags: ["Equipes"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *          200:
 *              description: Retorna uma lista de links de fotos.
 *          401:
 *              description: Não Autorizado, faça login para continuar
 */
router.get("/fotos", handlerEquipe.BuscarFotos)


/**
 * @swagger
 * /equipes/fotos:
 *   post:
 *     summary: Adicionar nova foto para Equipes 
 *     description: Permite adicionar uma nova foto de perfil que poderá ser usada por uma equipe!
 *     tags: ["Equipes"]
 *     security: 
 *        - BearerAuth: []
 *     consumes:
 *        - multipart/form-data
 *     parameters:
 *        - in: formData
 *          name: foto
 *          type: file
 *          required: true
 *          description: Foto que será Postada.
 *     responses:
 *       200:
 *         description: Retorna o link da fotos postada.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.post("/fotos", multer(multerConfig).single('foto'), handlerEquipe.AddFoto)


/**
 * @swagger
 * /equipes:
 *   post:
 *     summary: Cadastrar uma nova Equipe
 *     description: Permite criar uma nova equipe!
 *     tags: ["Equipes"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Equipe (req)'
 *     responses:
 *       201:
 *         description: Retorna todos os dados da nova equipe cadastrada.   
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.post("/", handlerEquipe.NovaEquipe)


/**
 * @swagger
 * /equipes:
 *   get:
 *     summary: Ver todas as Equipes 
 *     description: Busca todas as equipes cadastradas!
 *     tags: ["Equipes"]
 *     security: 
 *        - BearerAuth: []
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
 *     summary: Ver uma Equipe Específica
 *     description: Busca uma equipe específica pelo ID dela!
 *     tags: ["Equipes"]
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
 *         description: Retorna a equipe com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.get("/:id", handlerEquipe.BuscarPorId)


/**
 * @swagger
 * /equipes/{id}:
 *   put:
 *     summary: Atualizar Informações de uma Equipe
 *     description: Atualiza os dados de uma equipe!
 *     tags: ["Equipes"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Equipe (req)'
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
 *     summary: Apagar uma Equipe
 *     description: Apaga uma Equipe!
 *     tags: ["Equipes"]
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
 *         description: Equipe apagada com sucesso.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.delete("/:id", handlerEquipe.Delete)


/**
 * @swagger
 * /equipes/{eq}/pessoas/{pe}:
 *   post:
 *     summary: Associar uma Equipe com uma Pessoa
 *     description: Associa pessoas com uma equipe!
 *     tags: ["Equipes"]
 *     security: 
 *        - BearerAuth: []
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
 *         description: Pessoa associada com equipe.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */
router.post("/:eq/pessoas/:pe", handlerEquipe.AssociaPessoa)

module.exports = router