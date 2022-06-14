const express = require('express')
const routes = express.Router()

var pessoas = [
    {Id:'1',  Nome: 'Larissa',   Profissao: 'frontEnd',  Equipe: '25',    Tarefa: '14'}, 
    {Id:'2',  Nome: 'Dayanne',   Profissao: 'BackEnd',   Equipe: '3',     Tarefa: '20'},
    {Id:'45', Nome: 'Iara',      Profissao: 'BD',        Equipe: '3',     Tarefa: '1'},
    {Id:'4',  Nome: 'Caio',      Profissao: 'frontEnd',  Equipe: '25',    Tarefa: '14'},
    {Id:'5',  Nome: 'Pedro',     Profissao: 'BackEnd',   Equipe: '21',    Tarefa: '20'},
    {Id:'6',  Nome: 'Bruno',     Profissao: 'DevOps',    Equipe: '3',     Tarefa: '1' },
    {Id:'7',  Nome: 'Carlos',    Profissao: 'frontEnd',  Equipe: '21',    Tarefa: '14'}
]

var equipes = [
    {Id:'25',   Nome: 'equipe 25', Projetos: '8'},
    {Id:'21',   Nome: 'equipe 21', Projetos: '7'},
    {Id:'3',    Nome: 'equipe 3', Projetos: '4'}
]

var projetos = [
    {Id:'4', Nome: 'Pousada'},
    {Id:'8', Nome: 'API'},
    {Id:'7', Nome: 'GP-Inovação'}
]

var tarefas = [
    {Id:'14', Nome: 'Fazer tal coisa', Descrição: 'Descrição task 14'},
    {Id:'20', Nome: 'Organizar aquilo ali', Descrição: 'Descrição task 20'},
    {Id:'1',  Nome: 'Olhar o negoço', Descrição: 'Descrição task 1'}
]


// Tela Principal
routes.get('/', (req, res) => {
    return res.json(`Menu Principal, Acesse: https://github.com/VinicciusSantos/API-NodeJs para saber mais`)
})


/* ------------------------------ Pessoas ------------------------------ */

// Mostrando todas as pessoas
routes.get('/pessoas', (req, res) => {
    if (pessoas.length == 0) {
        return res.json("Não existem cadastros de pessoas!")
    }
    return res.json(pessoas)
})

// Mostrando pessoas com um ID específico
routes.get('/pessoas/:id', (req, res) => {
    const id = req.params.id

    if (pessoas.length == 0) {
        return res.json("Não existem cadastros de pessoas!")
    }

    for (let index = 0; index < pessoas.length; index++) {
        if (id == pessoas[index].Id) {
            return res.json(pessoas[index])
        }
    }
    return res.json("ID não encontrado!")
})

// Inserindo pessoas
routes.post('/pessoas', (req, res) => {
    const body = req.body

    if (!body)
        return res.status(400).end()

    pessoas.push(body)
    return res.json("Pessoa Inserida com sucesso!")
})

// Deletando pessoas
routes.delete('/pessoas/:id', (req, res) => {
    const id = req.params.id

    let encontrado = 0
    let newDB = []
    for (let i = 0; i < pessoas.length; i++) {
        if (id != pessoas[i].Id) {
            newDB.push(pessoas[i])
        }
        else {
            encontrado = 1
        }
    }

    if (encontrado == 0) {
        return res.json("ID não encontrado!")
    }
    pessoas = newDB
    return res.json("Pessoa Deletada com sucesso!")
})

// Editando pessoas
routes.put('/pessoas/:id', (req,res) =>{
    const id = req.params.id

    for (let i = 0; i < pessoas.length; i++) {
        if (id == pessoas[i].Id) {
            pessoas[i] = req.body
            return res.json("Pessoa Editada com sucesso!")
        } 
    }
    return res.json("ID não encontrado!")
})


/* ------------------------------ Projetos ------------------------------ */

// Mostrando todos os Projetos
routes.get('/projetos', (req, res) => {
    if (projetos.length == 0) {
        return res.json("Não existem cadastros de projetos!")
    }
    return res.json(projetos)
})

// Mostrando projetos pelo ID
routes.get('/projetos/:id', (req, res) => {
    const id = req.params.id

    if (projetos.length == 0) {
        return res.json("Não existem cadastros de projetos!")
    }

    for (let index = 0; index < projetos.length; index++) {
        if (id == projetos[index].Id) {
            return res.json(projetos[index])
        }
    }
    return res.json("ID não encontrado!")
})

// Inserindo projetos
routes.post('/projetos', (req, res) => {
    const body = req.body

    if (!body)
        return res.status(400).end()

    projetos.push(body)
    return res.json("Projeto inserido com sucesso!")
})

// Deletando projetos
routes.delete('/projetos/:id', (req, res) => {
    const id = req.params.id

    let encontrado = 0
    let newDB = []
    for (let i = 0; i < projetos.length; i++) {
        if (id != projetos[i].Id) {
            newDB.push(projetos[i])
        } 
        else {
            encontrado = 1
        }
    }

    if (encontrado == 0) {
        return res.json("ID não encontrado!")
    }
    projetos = newDB
    return res.json("Projeto Deletado com sucesso!")
})

// Editando projetos
routes.put('/projetos/:id', (req,res) =>{
    const id = req.params.id

    for (let i = 0; i < projetos.length; i++) {
        if (id == projetos[i].Id) {
            projetos[i] = req.body
            return res.json("Projeto Editado com Sucesso!")
        } 
    }
    return res.json("ID não encontrado!")
})


/* ------------------------------ Equipes ------------------------------ */

// Mostrando todas as equipes
routes.get('/equipes', (req, res) => {
    if (equipes.length == 0) {
        return res.json("Não existem cadastros de equipes!")
    }
    return res.json(equipes)
})

// Mostrando equipes específicas pelo ID
routes.get('/equipes/:id', (req, res) => {
    if (equipes.length == 0) {
        return res.json("Não existem cadastros de equipes!")
    }
    const id = req.params.id
    for (let index = 0; index < equipes.length; index++) {
        if (id == equipes[index].Id) {
            return res.json(equipes[index])
        }
    }
    return res.json("ID não encontrado!")
})

// Inserindo equipe 
routes.post('/equipes', (req, res) => {
    const body = req.body

    if (!body)
        return res.status(400).end()

    equipes.push(body)
    return res.json("Equipe Inserida com Sucesso!")
})

// Deletando equipes
routes.delete('/equipes/:id', (req, res) => {
    const id = req.params.id

    let encontrado = 0
    let newDB = []
    for (let i = 0; i < equipes.length; i++) {
        if (id != equipes[i].Id) {
            newDB.push(equipes[i])
        } else {
            encontrado = 1
        }
    }

    if (encontrado == 0) {
        return res.json("ID não encontrado!")
    }

    equipes = newDB
    return res.json("Equipe Deletada com Sucesso!")
})

// Editando equipes
routes.put('/equipes/:id', (req,res) =>{
    const id = req.params.id

    for (let i = 0; i < equipes.length; i++) {
        if (id == equipes[i].Id) {
            equipes[i] = req.body
            return res.json("Equipe Editada com Sucesso!")
        }
    }
    return res.json("ID não encontrado!")
})


/* ------------------------------ Tarefas ------------------------------ */

// Mostrando todas as tarefas
routes.get('/tarefas', (req, res) => {
    if (tarefas.length == 0) {
        return res.json("Não existem cadastros de tarefas!")
    }
    return res.json(tarefas)
})

// Mostrando tarefas com um ID específico
routes.get('/tarefas/:id', (req, res) => {
    const id = req.params.id

    if (tarefas.length == 0) {
        return res.json("Não existem cadastros de tarefas!")
    }
    
    for (let index = 0; index < tarefas.length; index++) {
        if (id == tarefas[index].Id) {
            return res.json(tarefas[index])
        }
    }
    return res.json("ID não encontrado!")
})

// Inserindo tarefas
routes.post('/tarefas', (req, res) => {
    const body = req.body

    if (!body)
        return res.status(400).end()

    tarefas.push(body)
    return res.json("Tarefa inserida com sucesso!")
})

// Deletando tarefas
routes.delete('/tarefas/:id', (req, res) => {
    const id = req.params.id

    let encontrado = 0
    let newDB = []
    for (let i = 0; i < tarefas.length; i++) {
        if (id != tarefas[i].Id) {
            newDB.push(tarefas[i])
        } else {
            encontrado = 1
        }
    }

    if (encontrado == 0) {
        return res.json("ID não encontrado!")
    }
    pessoas = newDB
    return res.json("Tarefa Excluida com sucesso")
})

// Editando tarefas
routes.put('/tarefas/:id', (req,res) =>{
    const id = req.params.id

    for (let i = 0; i < tarefas.length; i++) {
        if (id == tarefas[i].Id) {
            tarefas[i] = req.body
            return res.json("Tarefa editada com sucesso!")
        } 
    }
    return res.json("ID não encontrado!") 
})


/* --------------------- Rotas Relacionadas com a interação de duas listas --------------------- */

// Mostar as pessoas de uma equipe
routes.get('/equipes/:id/pessoas', (req, res) => {
    const id = req.params.id

    // Somente para saber se a equipe existe
    if (equipes.length == 0) {
        return res.json("Não existem cadastros de equipes!")
    }

    let equipeExiste = 0
    for (let index = 0; index < equipes.length; index++) {
        if (id == equipes[index].Id) {
            equipeExiste = 1
            break
        }
    }
    if (equipeExiste == 0) {
        return res.json("ID de equipe não encontrado!")
    }

    // Procurando pessoas com o ID de equipe
    var newDB = []
    for (let index = 0; index < pessoas.length; index++) {
        if (pessoas[index].Equipe == id) {
            newDB.push(pessoas[index])
        }
    }
    if (newDB.length == 0){
        return res.json("Não há pessoas nessa equipe!") 
    }
    return res.json(newDB)
})

// Mostrar tarefas de uma equipe
routes.get('/equipes/:id/tarefas', (req, res) => {
    const id = req.params.id

    if (equipes.length == 0) {
        return res.json("Não existem cadastros de equipes!")
    }
    
    // Percorrendo as equipes para encontrar o ID
    let posEquipe
    let equipeExiste = 0
    for (let index = 0; index < equipes.length; index++) {
        if (id == equipes[index].Id) {
            equipeExiste = 1
            posEquipe = index
        }     
    }

    if (equipeExiste == 0) {
        return res.json("ID de equipe não encontrado!")
    }

    // Percorrendo as pessoas
    let listaTarefas = []
    for (let index = 0; index < pessoas.length; index++) {
        if (pessoas[index].Equipe == equipes[posEquipe].Id){
            listaTarefas.push(pessoas[index].Tarefa)
        }     
    }
    if (listaTarefas.length == 0){
        return res.json("Não existem pessoas com essa tarefa!")
    }

    // Retornando o nome das tarefas
    listaCompleta  = []
    for (let index = 0; index < listaTarefas.length; index++) {
        for (let i = 0; i < tarefas.length; i++) {
            if (listaTarefas[index] == tarefas[i].Id) {
                listaCompleta.push(tarefas[i])
            }
        }
    }
    return res.json(listaCompleta)
})

// Mostar tarefa de uma pessoa
routes.get('/pessoas/:id/tarefas', (req, res) => {
    const id = req.params.id

    if (pessoas.length == 0) {
        return res.json("Não existem cadastros de pessoas!")
    }
    
    let posPessoa
    let pessoaEncontrada = 0
    for (let index = 0; index < pessoas.length; index++) {
        if (pessoas[index].Id == id) {
            pessoaEncontrada = 1
            posPessoa = index
        }
    }

    if (pessoaEncontrada == 0){
        return res.json("ID não encontrado!")
    }

    for (let index = 0; index < tarefas.length; index++) {
        if (tarefas[index].Id == pessoas[posPessoa].Tarefa) {
            return res.json(tarefas[index])
        }
    }
    return res.json("Tarefa não encontrada!")
})

// Mostrar equipes de um projeto
routes.get('/projetos/:id/equipes', (req, res) => {
    const id = req.params.id

    if (projetos.length == 0){
        return res.json("Não existem cadastros de projetos!")
    }

    let projetoEncontrado = 0
    for (let i = 0; i < projetos.length; i++) {
        if (projetos[i].Id == id) {
            projetoEncontrado = 1
            break
        }
    }
    if (projetoEncontrado == 0){
        return res.json("Projeto Não Encontrado")
    }

    let listaIdEquipes = []
    for (let i = 0; i < equipes.length; i++) {
        if (equipes[i].Projetos == id)
            listaIdEquipes.push(equipes[i])
    }
    if (listaIdEquipes.length == 0){
        return res.json("Não Existem Equipes nesse projeto")
    }

    return res.json(listaIdEquipes)
})

// Mostrar pessoas com uma mesma tarefa
routes.get('/tarefas/:id/pessoas', (req, res) => {
    const id = req.params.id

    if (tarefas.length == 0) {
        return res.json("Não existem cadastros de tarefas!")
    }
    
    let tarefaEncontrada = 0
    for (let index = 0; index < tarefas.length; index++) {
        if (id == tarefas[index].Id) {
            tarefaEncontrada = 1
            break
        }
    }
    if (tarefaEncontrada == 0) {
        return res.json("ID não encontrado!")
    }

    let listaPessoas = []
    for (let i = 0; i < pessoas.length; i++) {
        if (pessoas[i].Tarefa == id)
            listaPessoas.push(pessoas[i])
    }
    if (listaPessoas.length == 0) {
        return res.json("Não existem pessoas com essa tarefa!")
    }

    return res.json(listaPessoas)
})

module.exports = routes
