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
 *         description: Retorna um token de autorização.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

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
 *                      $ref: '#/components/schemas/Usuario - Cadastro (req)'
 *     responses:
 *       200:
 *         description: Retorna uma lista de equipes.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */