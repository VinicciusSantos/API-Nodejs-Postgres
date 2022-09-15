/**
 * @swagger
 * /relatorios/projetos:
 *   get:
 *     summary: Relatório de Projetos 
 *     description: Mostra a quantidade de projetos concluidos por mês
 *     tags: ["Relatórios"]
 *     security: 
 *        - BearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna a quantidade de projetos finalizados por mês.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /relatorios/equipes/{id}:
 *   get:
 *     summary: Relatório de uma Equipe
 *     description: Retorna os membros de uma equipe com a quantidade de tarefas que eles concluiram!
 *     tags: ["Relatórios"]
 *     security: 
 *        - BearerAuth: []
 *     parameters:
 *          -   in: path
 *              name: id
 *              schema:
 *                  type: integer
 *              required: true
 *              description: O Id da Equipe
 *     responses:
 *       200:
 *         description: Retorna uma lista de pessoas com as quantidades de tarefas concluidas por ela.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

/**
 * @swagger
 * /relatorios/pessoas/{id}:
 *   get:
 *     summary: Relatório de uma Pessoa
 *     description: Mostra a quantidade de tarefas feitas por uma pessoa separada por mês!
 *     tags: ["Relatórios"]
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
 *         description: Retorna a quantidade de tarefas feitas por uma pessoa a cada mês.
 *       401:
 *          description: Não Autorizado, faça login para continuar
 */

