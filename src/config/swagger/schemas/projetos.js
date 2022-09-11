/**
* @swagger
* components:
*      schemas:
*          Projeto:
*              type: object
*              required: 
*                  - nome
*                  - status
*              properties:
*                  id:
*                      type: integer
*                      description: O Identificador Gerado Automaticamente no cadastro do projeto
*                  nome:
*                      type: string
*                      description: O Nome do Projeto
*                  descricao:
*                      type: string
*                      description: decrição do Projeto
*                  status:
*                      type: string
*                      description: Status que o projeto está
*                  createdAt:
*                      type: date
*                      description: Data de Cadastro do Projeto (Gerada Automaticamente)
*                  updatedAt:
*                      type: date
*                      description: Data da Ultima Atualização dos dados (Gerada Automaticamente)
*              example:
*                  id: 1
*                  nome: GP Inovação
*                  descricao: Uma corrida de inovação aberta em que equipes multidisciplinares, criam ideias de soluções para os problemas apresentados.
*                  status: Não Iniciado
*                  createdAt: 2022-09-09 12:31:45.51+00
*                  updatedAt: 2022-09-09 12:31:45.51+00
*/