/**
 * @swagger
 * /tarefas:
 *   get:
 *     summary: Ver todas as tarefas 
 *     description: Busca todas as tarefas cadastradas!
 *     tags: ["Tarefas"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna um lista de tarefas.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /tarefas/{id}:
 *   get:
 *     summary: Ver um tarefa Específica
 *     description: Busca um tarefa específica pelo ID dele!
 *     tags: ["Tarefas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da tarefa
 *     responses:
 *       200:
 *         description: Retorna a tarefa com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /tarefas:
 *   post:
 *     summary: Cadastrar uma nova tarefa
 *     description: Permite criar uma nova tarefa!
 *     tags: ["Tarefas"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tarefa (req)'
 *     responses:
 *       201:
 *         description: Retorna todas os dados da nova tarefa cadastrada.   
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /tarefas/{id}:
 *   put:
 *     summary: Atualizar Informações de uma tarefa
 *     description: Atualiza os dados de uma tarefa!
 *     tags: ["Tarefas"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Tarefa (req)'
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id doatarefa
 *     responses:
 *       200:
 *         description: Retorna a tarefa com as edições feitas.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /tarefas/{id}:
 *   delete:
 *     summary: Apagar uma tarefa
 *     description: Apaga uma tarefa!
 *     tags: ["Tarefas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da tarefa
 *     responses:
 *       200:
 *         description: tarefa apagada com sucesso.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /tarefas/status:
 *   get:
 *     summary: Ver todos os status
 *     description: Mostra os status de tarefas com a quantidade de tarefas ocupando cada um
 *     tags: ["Tarefas"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna as status e a quantidade de tarefas que ocupam as respectivas status.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /tarefas/status/{status}:
 *   get:
 *     summary: Ver tarefas com um status
 *     description: Busca um tarefas pelo nome do status que ela ocupa
 *     tags: ["Tarefas"]
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
 *         description: Retorna a tarefa com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /tarefas/{id}/status/{status}:
 *   put:
 *     summary: Mudar o Status de uma tarefa
 *     description: Muda o status da tarefa
 *     tags: ["Tarefas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: id do tarefa
 *          -   in: path
 *              name: status
 *              schema:
 *                  type: string
 *              required: true
 *              description: Nome do status
 *     responses:
 *       200:
 *         description: Retorna a tarefa com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */