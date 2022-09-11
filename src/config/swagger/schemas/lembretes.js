/**
 * @swagger
 * components:
 *      schemas:
 *          Lembrete:
 *              type: object
 *              required: 
 *                  - descricao
 *                  - data
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: O Identificador Gerado Automaticamente no cadastro de um lembrete
 *                  descricao:
 *                      type: string
 *                      description: Descrição do lembrete
 *                  data:
 *                      type: date
 *                      description: A data que o evento do lembrete está marcado
 *                  createdAt:
 *                      type: date
 *                      description: Data de Criação do Lembrete (Gerada Automaticamente)
 *                  updatedAt:
 *                      type: date
 *                      description: Data da Ultima Atualização dos dados (Gerada Automaticamente)
 *              example:
 *                  id: 1
 *                  descricao: Participar da Reunião
 *                  data: 2022-12-09 10:13:50.51+00
 *                  createdAt: 2022-09-09 12:31:45.51+00
 *                  updatedAt: 2022-09-09 12:31:45.51+00
*/