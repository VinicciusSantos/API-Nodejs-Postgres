/**
* @swagger
* components:
*      schemas:
*          SubTarefa (req):
*              type: object
*              required: 
*                  - nome
*                  - prioridade
*              properties:
*                  nome:
*                      type: string
*                      description: O Nome da subTarefa
*                  prioridade:
*                      type: integer
*                      description: prioridade da subTarefa, pode ser 1, 2 ou 3, quanto mais alto, maior
*              example: 
*                  nome: Fazer Alguma coisa
*                  prioridade: 3
*/

/**
* @swagger
* components:
*      schemas:
*          SubTarefa (res):
*              type: object
*              required: 
*                  - nome
*                  - status
*                  - tarefaId
*              properties:
*                  id:
*                      type: integer
*                      description: O Identificador Gerado Automaticamente no cadastro da subTarefa
*                  nome:
*                      type: string
*                      description: O Nome da subTarefa
*                  status:
*                      type: integer
*                      description: Status que a subTarefa possui (0 ou 1)
*                  prioridade:
*                      type: integer
*                      description: prioridade da subTarefa, pode ser 1, 2 ou 3, quanto mais alto, maior
*                  tarefaId:
*                       type: integer
*                       description: Id da tarefa que a subTarefa está associada
*                  createdAt:
*                      type: date
*                      description: Data de Cadastro da subTarefa (Gerada Automaticamente)
*                  updatedAt:
*                      type: date
*                      description: Data da Ultima Atualização dos dados (Gerada Automaticamente)
*              example:
*                  id: 1
*                  nome: GP Inovação
*                  status: 0
*                  prioridade: 3
*                  tarefaId: 21
*                  createdAt: 2022-09-09 12:31:45.51+00
*                  updatedAt: 2022-09-09 12:31:45.51+00
*/