/**
 * @swagger
 * components:
 *      schemas:
 *          FotoPadrao:
 *              type: object
 *              required: 
 *                  - link
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: O Identificador Gerado Automaticamente no upload da foto
 *                  link:
 *                      type: string
 *                      description: Endereço da imagem
 *                  createdAt:
 *                      type: date
 *                      description: Data de updload da imagem (Gerada Automaticamente)
 *                  updatedAt:
 *                      type: date
 *                      description: Data da Ultima Atualização dos dados (Gerada Automaticamente)
 *              example:
 *                  id: 1
 *                  link: https://fotos-brisa-api.s3.amazonaws.com/uploads/434ad4de-5b6e-485d-890a-372b4a9320f6-0fc73da1-9db4-45c0-9113-01966699fa37-IMG-20220820-WA0011.jpg
 *                  createdAt: 2022-09-09 12:31:45.51+00
 *                  updatedAt: 2022-09-09 12:31:45.51+00
*/