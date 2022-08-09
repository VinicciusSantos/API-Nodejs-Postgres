<div align="center" display="flex">
  <img height="70px" src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png'>
  <h1 align="center">API com Node.js e PostgreSQL</h1>
</div>

![Badge Concluido](http://img.shields.io/static/v1?label=STATUS&message=EM-DESENVOLVIMENTO&color=GREEN&style=for-the-badge)

<p>Disponível em: https://api-brisa-nodejs-postgresql.herokuapp.com</p>

# Desenvolvedores
<ul>
  <li><a href="https://github.com/larissacard">Larissa Cardoso</a></li>
  <li><a href="https://github.com/Lucassec1">Lucas Emanuel</a></li>
  <li><a href="https://github.com/VinicciusSantos">Vinicius Guedes</a></li>
</ul>

# Menu
* [Sobre o Sistema](#sobre-o-sistema)
* [Funcionalidades](#funcionalidades)
* [Projetos](#projetos)
    * [Cadastrar um Projeto](#cadastrar-um-projeto)
    * [Deletar um Projeto](#deletar-um-projeto)
    * [Buscar todos os Projetos](#buscar-todos-os-projetos)
	* [Buscar um Projeto Especifico](#buscar-um-projeto-especifico)
	* [Ver os Status que estão sendo utilizados](#ver-os-status-que-estão-sendo-utilizados)
	* [Buscar todos os projetos com um determinado status](#buscar-todos-os-projetos-com-um-determinado-status)
	* [Vincular projeto com tarefa](#vincular-projeto-com-tarefa)


# Sobre o Sistema
- Um sistema para manter projetos, o sistema deve cadastrar projetos e equipes, um projeto possui uma equipe e deve ter tarefas dentro do projeto onde os membros da equipe podem se atribuir;
- Foi desenvolvido com [NodeJs](https://nodejs.org/en/), [Express](https://expressjs.com/pt-br/) e [PostgreSQL](https://www.postgresql.org);
- O Banco de Dados e a API estão hospedadas no [Heroku](https://www.heroku.com).


# Funcionalidades

- [x] Manter Equipe
- [x] Manter Projeto
- [x] Associar Equipe a projeto
- [x] Criar tarefa no projeto
- [x] Atribuir tarefa 


#  Projetos
## Cadastrar um Projeto
Usando o método POST podemos acessar o seguinte endereço:

```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos
```

São esperadas as seguintes entradas:
```
{
		"pr_nome": "",
		"pr_descricao": "",
		"equipes": ["Equipe 1", "Equipe2"]
}
```
Observações:
- Não é possível cadastrar projetos com nomes já existentes
- No campo de "equipes", é passado um array com os nomes das equipes cadastradas

## Deletar um Projeto
Para apagar um projeto, é necessário acessar o seguinte endereço usando o método DELETE, sendo ":id" um identificador de um projeto:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos/:id
```
Observações:
- Caso não seja passado um id válido ou um id de não existente, será retornado um código de erro

## Buscar todos os Projetos
Retorna todos os projetos que foram cadastrados em uma lista de objetos

```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos
```
```
[
	{
		"pr_id": 1,
		"pr_nome": "Projeto1",
		"pr_descricao": "O Projeto 1 tem como finalidade...",
		"pr_status": "Em Andamento",
		"pr_data_criacao": "2022-03-20T00:00:00.000Z",
		"pr_data_finalizacao": null
	},
	{
		"pr_id": 2,
		"pr_nome": "Projeto2",
		"pr_descricao": Um Projeto para...",
		"pr_status": "Em Andamento",
		"pr_data_criacao": "2022-02-12T00:00:00.000Z",
		"pr_data_finalizacao": null
	}
]
```

## Buscar um Projeto Especifico:
Acessar a seguinte rota usando o método GET:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos/:id
```
O retorno esperado é um objeto com as seguintes informações:
- Dados (infomações básicas);
- Equipes (Lista de equipes com as pessoas delas)
- Tarefas (Lista de tarefas divididas em: Não Iniciadas, Em Desenvolvimento, em Testes, Concluidas)
```
{
	"dados": {
		"pr_id": 1,
		"pr_nome": "Projeto 1",
		"pr_descricao": "O Gp é...",
		"pr_status": "Em Andamento",
		"pr_data_criacao": "2022-03-20T00:00:00.000Z",
		"pr_data_finalizacao": null
	},
	"equipes": [
		{
			"eq_id": 1,
			"eq_nome": "Equipe Alfa",
			"pessoas": [
				{
					"pe_id": 1,
					"pe_nome": "Priscila Fernandes Rosado",
					"pe_cargo": "FrontEnd Junior",
					"pe_salario": 2525,
					"eq_nome": "Equipe Alfa",
					"eq_id": 1
				},
				{
					"pe_id": 12,
					"pe_nome": "Sr. Yuri Caldeira",
					"pe_cargo": "FrontEnd Junior",
					"pe_salario": 2525,
					"eq_nome": "Equipe Alfa",
					"eq_id": 1
				}
			]
		},
		{
			"eq_id": 2,
			"eq_nome": "Equipe Beta",
			"pessoas": [
				{
					"pe_id": 3,
					"pe_nome": "Ana Almeida",
					"pe_cargo": "FrontEnd Junior",
					"pe_salario": 2525,
					"eq_nome": "Equipe Beta",
					"eq_id": 2
				}
			]
		}
	],
	"tarefas": {
		"NaoIniciadas": [
			{
				"tr_id": 44,
				"tr_nome": "Vender Limão",
				"tr_descricao": "comercio de limões",
				"tr_data_criacao": "2022-08-09T00:00:00.000Z",
				"tr_status": "Não Iniciado",
				"tr_data_finalizacao": null,
				"tr_prioridade": 1
			},
			{
				"tr_id": 56,
				"tr_nome": "Vende Kiwi",
				"tr_descricao": "vender frutas",
				"tr_data_criacao": "2022-08-09T00:00:00.000Z",
				"tr_status": "Não Iniciado",
				"tr_data_finalizacao": null,
				"tr_prioridade": 1
			}
		],
		"EmDesenvolvimento": [
			{
				"tr_id": 33,
				"tr_nome": "Comprar Biscoito",
				"tr_descricao": "asdfasdfsadfa",
				"tr_data_criacao": "2022-08-09T00:00:00.000Z",
				"tr_status": "Em Desenvolvimento",
				"tr_data_finalizacao": null,
				"tr_prioridade": 1
			},
			{
				"tr_id": 49,
				"tr_nome": "AB",
				"tr_descricao": "dsaddada",
				"tr_data_criacao": "2022-08-09T00:00:00.000Z",
				"tr_status": "Em Desenvolvimento",
				"tr_data_finalizacao": null,
				"tr_prioridade": 2
			}
		],
		"Testes": [
			{
				"tr_id": 6,
				"tr_nome": "Fazer pesquisa de anterioridade",
				"tr_descricao": "A busca de anterioridade pode ser definida...",
				"tr_data_criacao": "2022-04-20T00:00:00.000Z",
				"tr_status": "Em Testes",
				"tr_data_finalizacao": null,
				"tr_prioridade": 3
			}
		],
		"Concluidas": [
			{
				"tr_id": 5,
				"tr_nome": "Gravar o Pitch",
				"tr_descricao": "O pitch é uma apresentação sumária...",
				"tr_data_criacao": "2022-03-25T00:00:00.000Z",
				"tr_status": "Concluido",
				"tr_data_finalizacao": "2022-08-09T00:00:00.000Z",
				"tr_prioridade": 3
			}
		]
	}
}
```
## Ver os Status que estão sendo utilizados
Usando o método GET, podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos/status
```
retorno esperado: Lista de status e quantidade de projetos com seu respectiva categoria
```
[
	{
		"pr_status": "Ativo",
		"count": "19"
	},
	{
		"pr_status": "Concluido",
		"count": "1"
	},
	{
		"pr_status": "Em Andamento",
		"count": "4"
	}
]
```

## Buscar todos os projetos com um determinado status
Usando o método GET, podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos/status/:status
```
Observações:
- ":status" deve ser substituido pelo status que deve ser pesquisado
- O retorno esperado é uma lista de objetos
- Caso não tenha nenhum projeto com o status pesquisado, será retornado apenas um array vazio


## Vincular projeto com tarefa
Usando o método POST, podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos/:pr/tarefas/:tr
```
Observações:
- ":pr" se refere ao código identificador do projeto
- ":tr" se refere ao código identificador da tarefa

## Atualizar Informações de um Projeto
Usando o método PUT, podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos/:id
```
Observações:
- ":id" se refere ao código identificador do projeto

É necessario passar os seguintes campos:
```
{
	"pr_nome": "",
	"pr_descricao": ""
}
```

## Atualizar status de um Projeto
Usando o método PUT, podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos/:id/status/:status
```
Observações:
- ":id" se refere ao código identificador do projeto
- ":status" se refere ao novo status que será atribuido ao projeto