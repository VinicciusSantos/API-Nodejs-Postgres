/**
 * @swagger
 * components:
 *      schemas:
 *          Usuario:
 *              type: object
 *              required: 
 *                  - nome
 *                  - senha
 *                  - email
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: O Identificador Gerado Automaticamente no cadastro do usuário
 *                  nome:
 *                      type: string
 *                      description: O Nome do Usuário
 *                  email:
 *                      type: email
 *                      description: Email do Usuário
 *                  createdAt:
 *                      type: date
 *                      description: Data de Cadastro do Usuario (Gerada Automaticamente)
 *                  updatedAt:
 *                      type: date
 *                      description: Data da Ultima Atualização dos dados (Gerada Automaticamente)
 *              example:
 *                  id: 1
 *                  nome: Admin
 *                  email: admin@gmail.com
 *                  senha: admin123
 *                  createdAt: 2022-09-09 12:31:45.51+00
 *                  updatedAt: 2022-09-09 12:31:45.51+00
*/