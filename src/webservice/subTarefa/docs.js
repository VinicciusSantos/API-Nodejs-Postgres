/**
 * @swagger
 * /subTarefas:
 *   get:
 *     summary: Ver todos as subTarefas 
 *     description: Busca todos as subTarefas cadastrados!
 *     tags: ["subTarefas"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna um lista de subTarefas.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /subTarefas/{id}:
 *   get:
 *     summary: Ver uma subTarefa Específica
 *     description: Busca uma subTarefa específica pelo ID dela!
 *     tags: ["subTarefas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da subTarefa
 *     responses:
 *       200:
 *         description: Retorna a subTarefa com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /subTarefas/{tarefaId}:
 *   post:
 *     summary: Cadastrar uma nova subTarefa
 *     description: Permite criar uma nova subTarefa!
 *     tags: ["subTarefas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: tarefaId
 *              schema:
 *                  type: integer
 *              required: true
 *              description: Id da Tarefa que a subTarefa será associada
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SubTarefa (req)'
 *     responses:
 *       201:
 *         description: Retorna todos as dados da nova subTarefa cadastrada.   
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /subTarefas/{id}:
 *   put:
 *     summary: Atualizar Informações de uma subTarefa
 *     description: Atualiza as dados de uma subTarefa!
 *     tags: ["subTarefas"]
 *     security: 
 *        - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SubTarefa (req)'
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da subTarefa
 *     responses:
 *       200:
 *         description: Retorna a subTarefa com as edições feitas.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /subTarefas/{id}:
 *   delete:
 *     summary: Apagar uma subTarefa
 *     description: Apaga uma subTarefa!
 *     tags: ["subTarefas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da subTarefa
 *     responses:
 *       200:
 *         description: subTarefa apagada com sucesso.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /subTarefas/{id}/status/{status}:
 *   put:
 *     summary: Mudar o Status de uma subTarefa
 *     description: Muda o status da subTarefa
 *     tags: ["subTarefas"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: id do subTarefa
 *          -   in: path
 *              name: status
 *              schema:
 *                  type: integer (0 ou 1)
 *              required: true
 *              description: Nome do status
 *     responses:
 *       200:
 *         description: Retorna a subTarefa com o id definido.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */