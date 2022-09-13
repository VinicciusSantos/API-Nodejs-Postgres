/**
 * @swagger
 * /pessoas:
 *   get:
 *     summary: Ver todas as pessoas 
 *     description: Busca todas as pessoas cadastradas!
 *     tags: ["Pessoas"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna uma lista de pessoas.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /pessoas/{id}:
 *   get:
 *     summary: Ver uma Pessoa Específica
 *     description: Busca uma Pessoa específica pelo ID dela!
 *     tags: ["Pessoas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da Pessoa
 *     responses:
 *       200:
 *         description: Retorna a Pessoa com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Cadastrar uma nova Pessoa
 *     description: Permite criar uma nova Pessoa!
 *     tags: ["Pessoas"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Pessoa (req)'
 *     responses:
 *       201:
 *         description: Retorna todos os dados da nova Pessoa cadastrada.   
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /pessoas/{id}:
 *   put:
 *     summary: Atualizar Informações de uma Pessoa
 *     description: Atualiza os dados de uma Pessoa!
 *     tags: ["Pessoas"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Pessoa (req)'
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da Pessoa
 *     responses:
 *       200:
 *         description: Retorna a Pessoa com as edições feitas.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /pessoas/{id}:
 *   delete:
 *     summary: Apagar uma Pessoa
 *     description: Apaga uma Pessoa!
 *     tags: ["Pessoas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da Pessoa
 *     responses:
 *       200:
 *         description: Pessoa apagada com sucesso.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /pessoas/cargos:
 *   get:
 *     summary: Ver todos os cargos
 *     description: Mostra todas as profissões que estão sendo ocupadas
 *     tags: ["Pessoas"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna os cargos e a quantidade de pessoas que ocupam as respectivas funções.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /pessoas/cargos/{cargo}:
 *   get:
 *     summary: Ver pessoas com um Cargo
 *     description: Busca um pessoas pelo nome do cargo que ela ocupa
 *     tags: ["Pessoas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: cargo
 *              schema:
 *                  type: string
 *              required: true
 *              description: Nome do Cargo
 *     responses:
 *       200:
 *         description: Retorna a Pessoa com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

