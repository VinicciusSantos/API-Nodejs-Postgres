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
	* [Ver os Status que Estão Sendo Utilizados](#ver-os-status-que-estão-sendo-utilizados)
	* [Buscar Todos os Projetos com um Determinado Status](#buscar-todos-os-projetos-com-um-determinado-status)
	* [Vincular Projeto com Tarefa](#vincular-projeto-com-tarefa)
* [Equipes](#equipes)
	* [Cadastrar uma Equipe](#cadastrar-uma-equipe)
	* [Deletar uma Equipe](#deletar-uma-equipe)
	* [Buscar Todas as Equipes](#buscar-todas-as-equipes)
	* [Buscar uma Equipe Específica](#buscar-uma-equipe-especifica)
	* [Vincular Equipes com Pessoas](#vincular-equipes-com-pessoas)
	* [Atualizar informações de Equipes](#atualizar-informações-de-equipes)
* [Pessoas](#pessoas)
	* [Cadastrar uma Pessoa](#cadastrar-uma-pessoa)
	* [Deletar uma Pessoa](#deletar-uma-pessoa)
	* [Buscar Todas as Pessoas](#buscar-todas-as-pessoas)
	* [Buscar uma Pessoa Específica](#buscar-uma-pessoa-especifica)
	* [Atualizar informações de Pessoa](#atualizar-informações-de-pessoa)
	* [Buscar todas as Profissões](#buscar-todas-as-profissões)
	* [Buscar Pessoas pela Profissão](#buscar-pessoas-pela-profissão)
	* [Buscar todos os Status](#buscar-todos-os-status)
	* [Buscar Pessoas pelo Status](#buscar-pessoas-pelo-status)
	* [Mudar o status de uma pessoa](#mudar-o-status-de-uma-pessoa)
	* [Vincular Pessoa com Tarefa](#vincular-pessoa-com-tarefa)
* [Tarefas](#tarefas)
	* [Cadastrar uma Tarefa](#cadastrar-uma-tarefa)
	* [Deletar uma tarefa](#deletar-uma-tarefa)
	* [Buscar Todas as tarefas](#buscar-todas-as-tarefas)
	* [Buscar uma tarefa Específica](#buscar-uma-tarefa-especifica)
	* [Buscar uma tarefa com uma Prioriade Específica](#buscar-uma-tarefa-com-uma-prioridade-especifica)
	* [Atualizar informações de tarefa](#atualizar-informações-de-tarefa)
	* [Buscar todos os Status](#buscar-todos-os-status)
	* [Buscar tarefas pelo Status](#buscar-tarefas-pelo-status)
	* [Mudar o status de uma tarefa](#mudar-o-status-de-uma-tarefa)
* [Lembretes](#lembretes)
	* [Cadastrar um Lembrete](#cadastrar-um-lembrete)
	* [Deletar um Lembrete](#deletar-um-lembrete)
	* [Buscar Todas os Lembretes](#buscar-todas-os-lembretes)
* Relatorios
	* [Projetos Feitos](#projetos-feitos)
	* [Tarefas feitas por uma pessoa](#tarefas-feitas-por-uma-pessoa)

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

# Equipes
## Cadastrar uma Equipe
Usando o método POST podemos acessar o seguinte endereço:

```
https://api-brisa-nodejs-postgresql.herokuapp.com/equipes
```

São esperadas as seguintes entradas:
```
{
	"eq_nome": "",
	"pessoas": ["João", "Marcos"]
}
```
Observações:
- Não é possível cadastrar equipes com nomes já existentes
- No campo de "pessoas", é passado um array com os nomes das pessoas cadastradas

## Deletar uma Equipe
Para apagar uma equipe, é necessário acessar o seguinte endereço usando o método DELETE, sendo ":id" um identificador de uma equipe:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/equipes/:id
```
Observações:
- Caso não seja passado um id válido ou um id de não existente, será retornado um código de erro

## Buscar todas as Equipes
Retorna todas as equipes que foram cadastradas em uma lista de objetos

```
https://api-brisa-nodejs-postgresql.herokuapp.com/equipes
```
```
[
	{
		"eq_id": 1,
		"eq_nome": "Equipe Alfa",
		"pessoas": [
			{
				"pe_id": 12,
				"pe_nome": "Sr. Yuri Caldeira",
				"pe_data_nasc": "1945-07-01T00:00:00.000Z",
				"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
				"pe_status": "Aposentado",
				"pe_cargo": "FrontEnd Junior",
				"pe_salario": 2525,
				"eq_id": 1
			},
			{
				"pe_id": 19,
				"pe_nome": "Mariane Carvalho",
				"pe_data_nasc": "2001-10-30T00:00:00.000Z",
				"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
				"pe_status": "Ativo",
				"pe_cargo": "BackEnd Pleno",
				"pe_salario": 2525,
				"eq_id": 1
			}
		],
		"projetos": [
			{
				"pr_id": 1,
				"pr_nome": "Gp2111",
				"pr_descricao": "O Gp é...",
				"pr_status": "Em Andamento",
				"pr_data_criacao": "2022-03-20T00:00:00.000Z",
				"pr_data_finalizacao": null,
				"eq_id": 1
			},
			{
				"pr_id": 66,
				"pr_nome": "drctfvbyguhnjimok,ojhygt",
				"pr_descricao": "ftygbuhnji",
				"pr_status": "Ativo",
				"pr_data_criacao": "2022-08-09T00:00:00.000Z",
				"pr_data_finalizacao": null,
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
				"pe_data_nasc": "2000-05-12T00:00:00.000Z",
				"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
				"pe_status": "Desativado",
				"pe_cargo": "FrontEnd Junior",
				"pe_salario": 2525,
				"eq_id": 2
			},
			{
				"pe_id": 10,
				"pe_nome": "Ana Luiza da Conceição",
				"pe_data_nasc": "2003-10-30T00:00:00.000Z",
				"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
				"pe_status": "Ativo",
				"pe_cargo": "FrontEnd Pleno",
				"pe_salario": 2525,
				"eq_id": 2
			}
		],
		"projetos": [
			{
				"pr_id": 1,
				"pr_nome": "Gp2111",
				"pr_descricao": "O Gp é...",
				"pr_status": "Em Andamento",
				"pr_data_criacao": "2022-03-20T00:00:00.000Z",
				"pr_data_finalizacao": null,
				"eq_id": 2
			},
			{
				"pr_id": 66,
				"pr_nome": "drctfvbyguhnjimok,ojhygt",
				"pr_descricao": "ftygbuhnji",
				"pr_status": "Ativo",
				"pr_data_criacao": "2022-08-09T00:00:00.000Z",
				"pr_data_finalizacao": null,
				"eq_id": 2
			}
		]
	}
]
```

## Buscar uma Equipe Especifica
Acessar a seguinte rota usando o método GET:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/equipes/:id
```

Retorno Esperado:
```
{
	"eq_id": 1,
	"eq_nome": "Equipe Alfa"
}
```

## Vincular Equipes com Pessoas
Usando o método POST, podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/equipes/:eq/pessoas/:pe
```
Observações:
- ":eq" se refere ao código identificador da equipe
- ":pe" se refere ao código identificador da pessoa

## Atualizar Informações de Equipes
Usando o método PUT, podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/projetos/:id
```
Observações:
- ":id" se refere ao código identificador do projeto

É necessario passar os seguintes campos:
```
{
	"eq_nome": ""
}
```

# Pessoas

## Cadastrar uma Pessoa
Usando o método POST podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas/:id
```
Observações:
- ":id" se refere ao código identificador da pessoa

Entradas esperadas:
```
{
	"pe_nome": "",
	"pe_data_nasc": "",
	"pe_cargo": "",
	"pe_salario": 123,
	"pe_foto": ""
}
```

## Deletar uma Pessoa
Para apagar uma pessoa, é necessário acessar o seguinte endereço usando o método DELETE, sendo ":id" um identificador de uma pessoa:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas/:id
```
Observações:
- Caso não seja passado um id válido ou um id de não existente, será retornado um código de erro

## Buscar Todas as Pessoas
Usando o método GET podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas
```
Retorno esperado: Uma lista de objetos
```
[
	{
		"pe_id": 1,
		"pe_nome": "Priscila Fernandes Rosado",
		"pe_data_nasc": "2003-10-07T00:00:00.000Z",
		"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
		"pe_status": "Ativo",
		"pe_cargo": "FrontEnd Junior",
		"pe_salario": 2525,
		"pe_foto": "3e866f56aebff7be37.jpg"
	},
	{
		"pe_id": 2,
		"pe_nome": "Julieta Rangel Ribas",
		"pe_data_nasc": "1996-02-21T00:00:00.000Z",
		"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
		"pe_status": "Ativo",
		"pe_cargo": "FrontEnd Junior",
		"pe_salario": 2525,
		"pe_foto": "75ad5d6b4754fe736120477bb710.jpg"
	}
]
```

## Buscar uma Pessoa Especifica
Usando o método GET podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas/:id
```
Observações:
- Caso não seja passado um id válido ou um id de não existente, será retornado um código de erro
- ":id" é um código identificador de pessoas

## Atualizar informações de Pessoa
Usando o método PUT podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas/:id
```
São esperadas as seguintes entradas:
```
{
		"pe_nome": "",
		"pe_data_nasc": "",
		"pe_cargo": "",
		"pe_salario": 123
}
```
Observações:
- Caso não seja passado um id válido ou um id de não existente, será retornado um código de erro
- ":id" é um código identificador de pessoas

## Buscar todas as Profissões
Usando o método GET podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/cargos
```
Retorno Esperado: Lista de objetos contendo os cargos e a quantidade de pessoas que ocupam esses cargos
```
[
	{
		"cargo": "BackEnd Junior",
		"qtd": "9"
	},
	{
		"cargo": "BackEnd Pleno",
		"qtd": "6"
	},
	{
		"cargo": "FrontEnd Junior",
		"qtd": "34"
	},
	{
		"cargo": "FrontEnd Pleno",
		"qtd": "3"
	}
]
```

## Buscar Pessoas pela Profissão
Usando o método GET podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/cargos/:cargo
```
Observações:
- ":cargo" se refere a um nome de uma profissão

Retorno Esperado: Lista de Pessoas
```
[
	{
		"pe_id": 4,
		"pe_nome": "Maria Vitória Novaes",
		"pe_data_nasc": "1999-07-10T00:00:00.000Z",
		"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
		"pe_status": "Ativo",
		"pe_cargo": "BackEnd Junior",
		"pe_salario": 2525,
		"pe_foto": null
	},
	{
		"pe_id": 5,
		"pe_nome": "Otávio Rodrigues",
		"pe_data_nasc": "2000-08-01T00:00:00.000Z",
		"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
		"pe_status": "Ativo",
		"pe_cargo": "BackEnd Junior",
		"pe_salario": 2525,
		"pe_foto": null
	},
	{
		"pe_id": 21,
		"pe_nome": "Pedro Miguel",
		"pe_data_nasc": "2003-02-12T00:00:00.000Z",
		"pe_data_cadastro": "2022-08-04T00:00:00.000Z",
		"pe_status": "Não Iniciado",
		"pe_cargo": "BackEnd Junior",
		"pe_salario": 2500,
		"pe_foto": null
	}
]
```

## Buscar todos os Status
Usando o método GET podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas/status
```
Retorno Esperado: Lista de Objetos com os status e com a quantidade de pessoas com esse status
```
[
	{
		"pe_status": "Não Iniciado",
		"count": "33"
	},
	{
		"pe_status": "Ativo",
		"count": "14"
	},
	{
		"pe_status": "Aposentado",
		"count": "1"
	},
	{
		"pe_status": "Desativado",
		"count": "5"
	}
]
```

## Buscar Pessoas pelo Status
Usando o método GET podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas/status/:status
```
Retorno Esperado:
```
[
	{
		"pe_id": 3,
		"pe_nome": "Ana Almeida",
		"pe_data_nasc": "2000-05-12T00:00:00.000Z",
		"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
		"pe_status": "Desativado",
		"pe_cargo": "FrontEnd Junior",
		"pe_salario": 2525,
		"pe_foto": null
	},
	{
		"pe_id": 6,
		"pe_nome": "Sr. Ryan Silveira",
		"pe_data_nasc": "1996-10-22T00:00:00.000Z",
		"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
		"pe_status": "Desativado",
		"pe_cargo": "FrontEnd Junior",
		"pe_salario": 2525,
		"pe_foto": null
	},
	{
		"pe_id": 8,
		"pe_nome": "Isis das Neves",
		"pe_data_nasc": "2002-08-10T00:00:00.000Z",
		"pe_data_cadastro": "2022-08-03T00:00:00.000Z",
		"pe_status": "Desativado",
		"pe_cargo": "FrontEnd Junior",
		"pe_salario": 2525,
		"pe_foto": null
	}
]
```

## Mudar o status de uma pessoa
Usando o método PUT podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas/:id/status/:status
```
Observações:
- ":id" se refere ao código identificador da pessoa
- ":status" se refere ao novo status que a pessoa vai receber

## Vincular Pessoa com Tarefa
Usando o método POST podemos acessar o seguinte endereço:
```
https://api-brisa-nodejs-postgresql.herokuapp.com/pessoas/:id_pessoa/tarefas/:id_tarefa
```
Observações:
- ":id_pessoa" se refere ao código identificador da pessoa
- ":id_tarefa" se refere ao código identificador da tarefa

# Tarefas
## Cadastrar uma tarefa
## Deletar uma tarefa
## Buscar Todas as tarefas
## Buscar uma tarefa Específica
## Buscar uma tarefa com uma Prioriade Específica
## Atualizar informações de tarefa
## Buscar todos os Status
## Buscar tarefas pelo Status
## Mudar o status de uma tarefa

# Lembretes
## Cadastrar um Lembrete
## Deletar um Lembrete
## Buscar Todas os Lembretes

# Relatorios
## Projetos Feitos
## Tarefas feitas por uma pessoa