/**
 * @swagger
 * /projetos:
 *   get:
 *     summary: Ver todos os projetos 
 *     description: Busca todos os projetos cadastrados!
 *     tags: ["Projetos"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna um lista de projetos.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /projetos/{id}:
 *   get:
 *     summary: Ver um projeto Específico
 *     description: Busca um projeto específico pelo ID dele!
 *     tags: ["Projetos"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id do projeto
 *     responses:
 *       200:
 *         description: Retorna a projeto com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /projetos:
 *   post:
 *     summary: Cadastrar um novo projeto
 *     description: Permite criar um novo projeto!
 *     tags: ["Projetos"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/projeto (req)'
 *     responses:
 *       201:
 *         description: Retorna todos os dados do novo projeto cadastrada.   
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /projetos/{id}:
 *   put:
 *     summary: Atualizar Informações de um projeto
 *     description: Atualiza os dados de um projeto!
 *     tags: ["Projetos"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/projeto (req)'
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id do projeto
 *     responses:
 *       200:
 *         description: Retorna o projeto com as edições feitas.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /projetos/{id}:
 *   delete:
 *     summary: Apagar um projeto
 *     description: Apaga um projeto!
 *     tags: ["Projetos"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id do projeto
 *     responses:
 *       200:
 *         description: projeto apagado com sucesso.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /projetos/status:
 *   get:
 *     summary: Ver todos os status
 *     description: Mostra todos as profissões que estão sendo ocupadas
 *     tags: ["Projetos"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna os status e a quantidade de projetos que ocupam os respectivas status.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /projetos/status/{status}:
 *   get:
 *     summary: Ver projetos com um status
 *     description: Busca um projetos pelo nome do status que ela ocupa
 *     tags: ["Projetos"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: status
 *              schema:
 *                  type: string
 *              required: true
 *              description: Nome do status
 *     responses:
 *       200:
 *         description: Retorna a projeto com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /projetos/{id}/status/{status}:
 *   put:
 *     summary: Mudar o Status de um projeto
 *     description: Muda o status do projeto
 *     tags: ["Projetos"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: id do projeto
 *          -   in: path
 *              name: status
 *              schema:
 *                  type: string
 *              required: true
 *              description: Nome do status
 *     responses:
 *       200:
 *         description: Retorna a projeto com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */