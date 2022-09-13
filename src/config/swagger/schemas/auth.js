/**
 * @swagger
 * components:
 *      schemas:
 *          Usuario - Cadastro (req):
 *              type: object
 *              required: 
 *                  - nome
 *                  - senha
 *                  - confirmacao
 *                  - email
 *              properties:
 *                  nome:
 *                      type: string (3 - 100 caracteres)
 *                      description: O Nome do Usuário
 *                  email:
 *                      type: email
 *                      description: Email válido do Usuário
 *                  senha:
 *                      type: string (4 - 20 caracteres)
 *                      description: Senha definida pelo Usuário
 *                  confirmacao:
 *                      type: string (4 - 20 caracteres)
 *                      description: Confirmacao da senha definida pelo Usuário
 *              example:
 *                  nome: Admin
 *                  email: admin@gmail.com
 *                  senha: admin
 *                  confirmacao: admin
*/

/**
 * @swagger
 * components:
 *      schemas:
 *          Usuario - Cadastro (res):
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
 *                  senha:
 *                      type: string
 *                      description: Senha definida pelo Usuário
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
 *                  senha: admin
 *                  createdAt: 2022-09-09 12:31:45.51+00
 *                  updatedAt: 2022-09-09 12:31:45.51+00
*/

/**
 * @swagger
 * components:
 *      schemas:
 *          Usuario - Login:
 *              type: object
 *              required: 
 *                  - senha
 *                  - email
 *              properties:
 *                  email:
 *                      type: email
 *                      description: Email do Usuário
 *                  senha:
 *                      type: string
 *                      description: Senha definida pelo Usuário
 *              example:
 *                  email: admin@gmail.com
 *                  senha: admin
*/