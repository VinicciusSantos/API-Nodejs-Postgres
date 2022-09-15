/**
* @swagger
* components:
*      schemas:
*          Tarefa (req):
*              type: object
*              required: 
*                  - nome
*                  - status
*              properties:
*                  nome:
*                      type: string
*                      description: O Nome da Tarefa
*                  descricao:
*                      type: string
*                      description: decrição da Tarefa
*                  prioridade:
*                      type: integer
*                      description: Prioridade da tarefa (1, 2 ou 3)
*                  pessoas:
*                      type: array
*                      description: Lista de pessoas
*              example:
*                  id: 1
*                  nome: GP Inovação
*                  descricao: Uma corrida de inovação aberta em que equipes multidisciplinares, criam ideias de soluções para os problemas apresentados.
*                  
*/

/**
* @swagger
* components:
*      schemas:
*          Tarefa (res):
*              type: object
*              required: 
*                  - nome
*                  - status
*              properties:
*                  id:
*                      type: integer
*                      description: O Identificador Gerado Automaticamente no cadastro da Tarefa
*                  nome:
*                      type: string
*                      description: O Nome da Tarefa
*                  descricao:
*                      type: string
*                      description: decrição da Tarefa
*                  status:
*                      type: string
*                      description: Status que a Tarefa possui
*                  prioridade:
*                      type: integer
*                      description: Prioridade da tarefa (1, 2 ou 3)
*                  createdAt:
*                      type: date
*                      description: Data de Cadastro da Tarefa (Gerada Automaticamente)
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