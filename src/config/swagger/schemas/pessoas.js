/**
* @swagger
* components:
*      schemas:
*          Pessoa:
*              type: object
*              required: 
*                  - nome
*                  - nascimento
*                  - email
*              properties:
*                  id:
*                      type: integer
*                      description: O Identificador Gerado Automaticamente no cadastro da pessoa
*                  nome:
*                      type: string
*                      description: O Nome da Pessoa
*                  nascimento:
*                      type: date
*                      description: Data de Nascimento da Pessoa
*                  cargo:
*                      type: string
*                      description: Profissão que a pessoa ocupa
*                  salario:
*                      type: real
*                      description: Quando a pessoa ganha
*                  foto:
*                      type: string
*                      description: Link com a Foto que a pessoa fez o updload no momento do cadastro
*                  createdAt:
*                      type: date
*                      description: Data de Cadastro da Pessoa (Gerada Automaticamente)
*                  updatedAt:
*                      type: date
*                      description: Data da Ultima Atualização dos dados (Gerada Automaticamente)
*              example:
*                  id: 1
*                  nome: Alice
*                  nascimento: 2004-02-19 12:31:45.51+00
*                  cargo: FrontEnd Pleno
*                  salario: 8456.21
*                  foto: https://fotos-brisa-api.s3.amazonaws.com/uploads/434ad4de-5b6e-485d-890a-372b4a9320f6-0fc73da1-9db4-45c0-9113-01966699fa37-IMG-20220820-WA0011.jpg
*                  createdAt: 2022-09-09 12:31:45.51+00
*                  updatedAt: 2022-09-09 12:31:45.51+00
*/