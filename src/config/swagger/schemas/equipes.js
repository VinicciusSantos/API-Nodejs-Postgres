/**
 * @swagger
 * components:
 *      schemas:
 *          Equipe (res):
 *              type: object
 *              required: 
 *                  - nome
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: O Identificador Gerado Automaticamente na criação da equipe
 *                  nome:
 *                      type: string
 *                      description: O Nome dado para a Equipe
 *                  fotoPadraoId:
 *                      type: integer
 *                      description: Chave Estrangeira que define a foto que a equipe está utilizando
 *                  createdAt:
 *                      type: date
 *                      description: Data de Criação da Equipe (Gerada Automaticamente)
 *                  updatedAt:
 *                      type: date
 *                      description: Data da Ultima Atualização dos dados (Gerada Automaticamente)
 *              example:
 *                  id: 1
 *                  nome: Equipe Komanda
 *                  fotoPadraoId: 4
 *                  createdAt: 2022-09-09 12:31:45.51+00
 *                  updatedAt: 2022-09-09 12:31:45.51+00
*/

/**
 * @swagger
 * components:
 *      schemas:
 *          Equipe (req):
 *              type: object
 *              required: 
 *                  - nome
 *              properties:
 *                  nome:
 *                      type: string unique (4 - 100 caracteres)
 *                      description: O Nome dado para a Equipe
 *                  fotoPadraoId:
 *                      type: integer
 *                      description: Chave Estrangeira que define a foto que a equipe está utilizando
 *                  pessoas:
 *                      type: array
 *                      decription: lista dos nomes das pessoas que pertence à equipe
 *              example:
 *                  nome: Equipe Komanda
 *                  fotoPadraoId: 4
 *                  pessoas: ["Bruno Nascimento", "Pedro Miguel"]
*/