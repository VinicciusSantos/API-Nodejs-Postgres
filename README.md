<div align="center" display="flex">
  <img height="70px" src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png'>
  <h1 align="center">API com Node.js e PostgreSQL</h1>
</div>

![Badge Concluido](http://img.shields.io/static/v1?label=STATUS&message=CONCLUIDO&color=GREEN&style=for-the-badge)

<p>Disponível em: https://github.com/VinicciusSantos/API-Nodejs-Postgres</p>

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
    * [Exibir Todos os Projetos](#exibir-todos-os-projetos)
    * [Exibir Projeto Específico](#exibir-projeto-especifico)
    * [Exibir Equipes de um Projeto](#exibir-equipes-de-um-projeto)
    * [Cadastrar Projeto](#cadastrar-projeto)
    * [Editar Projeto](#editar-projeto)
    * [Deletar Projeto](#deletar-projeto)
* [Equipes](#equipes)
    * [Exibir Todas as Equipes](#exibir-todas-as-equipes)
    * [Exibir Equipe Específica](#exibir-equipe-especifica)
    * [Exibir Pessoas de uma Equipe](#exibir-pessoas-de-uma-equipe)
    * [Exibir Tarefas de uma Equipe](#exibir-tarefas-de-uma-equipe)
    * [Cadastrar Equipe](#cadastrar-equipe)
    * [Editar Equipe](#editar-equipe)
    * [Deletar Equipe](#deletar-equipe)
* [Pessoas](#pessoas)
    * [Exibir Todas as Pessoas](#exibir-todas-as-pessoas)
    * [Exibir Pessoas Específica](#exibir-pessoa-especifica)
    * [Exibir Tarefa de uma Pessoa](#exibir-tarefa-de-uma-pessoa)
    * [Cadastrar Pessoa](#cadastrar-pessoa)
    * [Editar Pessoa](#editar-pessoa)
    * [Deletar Pessoa](#deletar-pessoa)
* [Tarefas](#tarefas)
    * [Exibir Todas as Tarefas](#exibir-todas-as-tarefas)
    * [Exibir Tarefa Específica](#exibir-tarefa-especifica)
    * [Exibir Pessoas com a mesma Tarefa](#exibir-pessoas-com-a-mesma-tarefa)
    * [Cadastrar Tarefa](#cadastrar-tarefa)
    * [Editar Tarefa](#editar-tarefa)
    * [Deletar Tarefa](#deletar-tarefa)
* [Como Funcionam as Associações](#como-funcionam-as-associacoes)
    * [Estrutura dos Projetos](#estrutura-dos-projetos)
    * [Estrutura das Equipes](#estrutura-das-equipes)
    * [Estrutura das Pessoas](#estrutura-das-pessoas)
    * [Estrutura das Tarefas](#estrutura-das-tarefas)
    * [Relacionamento dos Elementos](#relacionamento-dos-elementos)
* [Avisos](#avisos)

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
<p>- Cada Projeto possui um ID e um Nome.<p>
<p>- Em um projeto, podemos ter várias equipes trabalhando</p>

## Exibir Todos os Projetos
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/projetos
```

## Exibir Projeto Especifico
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/projetos/:id
```

## Exibir Equipes de um Projeto
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/projetos/:id/equipes
```

## Cadastrar Projeto
<p>Um projeto tem os seguintes campos:
<ul>
  <li>Id</li>
  <li>Nome</li>
</ul>
<p>- Usando o método POST podemos acessar o seguinte endereço e cadastrar um elemento:</p>

```
https://api-brisa-nodejs.herokuapp.com/projetos
```

## Editar Projeto
<p>- Para editar um projeto, precisamos usar o ID dele</p>
<p>- Usando o método PUT podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/projetos/:id
```

## Deletar Projeto
<p>- Para deletar um projeto, precisamos usar o ID dele</p>
<p>- Usando o método DELETE podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/projetos/:id
```


# Equipes
## Exibir todas as Equipes
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/equipes
```

## Exibir Equipe Especifica
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/equipes/:id
```

## Exibir Pessoas de uma Equipe
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/equipes/:id/pessoas
```

## Exibir Tarefas de uma Equipe
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/equipes/:id/tarefas
```

## Cadastrar Equipe
<p>Uma equipe tem os seguintes campos:
<ul>
  <li>Id</li>
  <li>Nome</li>
  <li>Projetos</li>
</ul>
<p>- Usando o método POST podemos acessar o seguinte endereço e cadastrar um elemento:</p>

```
https://api-brisa-nodejs.herokuapp.com/equipes
```

## Editar Equipe
<p>- Para editar uma equipe, precisamos usar o ID dela</p>
<p>- Usando o método PUT podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/equipes/:id
```

## Deletar Equipe
<p>- Para deletar uma Equipe, precisamos usar o ID dela</p>
<p>- Usando o método DELETE podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/equipes/:id
```

# Pessoas
## Exibir todas as Pessoas
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/pessoas
```

## Exibir Pessoa Especifica
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/pessoas/:id
```

## Exibir Tarefa de uma Pessoa
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/pessoas/:id/tarefas
```

## Cadastrar Pessoa
<p>Uma Pessoa tem os seguintes campos:
<ul>
  <li>Id</li>
  <li>Nome</li>
  <li>Profissão</li>
  <li>Equipe</li>
  <li>Tarefa</li>
</ul>
<p>- Usando o método POST podemos acessar o seguinte endereço e cadastrar um elemento:</p>

```
https://api-brisa-nodejs.herokuapp.com/pessoas
```

## Editar Pessoa
<p>- Para editar uma pessoa, precisamos usar o ID dela</p>
<p>- Usando o método PUT podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/pessoas/:id
```

<h2>Deletar Pessoa</h2>
<p>- Para deletar uma pessoa, precisamos usar o ID dela</p>
<p>- Usando o método DELETE podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/pessoas/:id
```

# Tarefas
## Exibir todas as Tarefas
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/tarefas
```

## Exibir Tarefa Especifica
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/tarefas/:id
```

## Exibir Pessoas com a mesma Tarefa
<p>- Para Buscar algum elemento individualmente, precisamos usar o ID dele.</p>
<p>- Usando o método GET podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/tarefas/:id/pessoas
```

## Cadastrar Tarefa
<p>Uma Tarefa tem os seguintes campos:
<ul>
  <li>Id</li>
  <li>Nome</li>
  <li>Descrição</li>
</ul>
<p>- Usando o método POST podemos acessar o seguinte endereço e cadastrar um elemento:</p>

```
https://api-brisa-nodejs.herokuapp.com/tarefas
```

## Editar Tarefa
<p>- Para editar uma Tarefa, precisamos usar o ID dela</p>
<p>- Usando o método PUT podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/tarefas/:id
```

## Deletar Tarefa
<p>- Para deletar uma tarefa, precisamos usar o ID dela</p>
<p>- Usando o método DELETE podemos acessar o seguinte endereço:</p>

```
https://api-brisa-nodejs.herokuapp.com/tarefas/:id
```

<br>

# Como Funcionam as Associacoes

<p>Elas se dão pelos IDs de um grupo armazenados em outro, por exemplo:
<p>Dentro de equipes, nós não armazenamos nenhum dado das pessoas que pertencem a ela, porém, mesmo assim conseguimos ter acesso à essa informação, pois cada pessoa tem guardado o ID de qual equipe ela está. Dessa forma, se quisermos saber quais são as pessoas da equipe 'x', é só ver as pessoas que tem o ID da equipe 'x'</p>
<p>Da mesma forma acontece a associação com os outros elementos</p>
<br>

<div align="center">
  <img src="data/Modelo_Lógico.png" width="80%">
</div>

## Estrutura dos Projetos

<ul>
  <li>ID</li>
  <li>Nome</li>
</ul>

## Estrutura das Equipes

<ul>
  <li>ID</li>
  <li>Nome</li>
  <li>Projeto*</li>
</ul>
<p>* = Chave Estrangeira</p>

## Estrutura das Pessoas

<ul>
  <li>ID</li>
  <li>Nome</li>
  <li>Profissão</li>
  <li>Equipe*</li>
  <li>Tarefa*</li>
</ul>
<p>* = Chave Estrangeira</p>

## Estrutura das Tarefas

<ul>
  <li>ID</li>
  <li>Nome</li>
  <li>Descrição</li>
</ul>

<br>

## Relacionamento dos Elementos

<p>Sabendo da estrutura dos elementos, podemos chegar às seguintes conclusões:</p>
<ul>
  <li>Várias pessoas podem ter a mesma tarefa, mas cada pessoa só pode ter uma tarefa</li>
  <li>Uma equipe pode ter várias pessoas, mas uma pessoa só pode estar em uma equipe</li>
  <li>Um Projeto pode ter várias equipes, mas uma equipe só pode estar em um projeto</li>
  <li>Dentro de uma equipe, as pessoas podem ter tarefas diferentes</li>
</ul>

# Avisos
<ul>
  <li>Caso seja digitado um ID inexistente, será retornado "Id não encontrado";</li>
  <li>O sistema não valida IDs Duplicados.</li>
</ul>
