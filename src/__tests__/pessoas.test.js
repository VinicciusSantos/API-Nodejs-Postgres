const server = require('../webservice/main')
const request = require('supertest');
const uuid = require('uuid').v4

let pessoaId = 0;
const login = async () => {
    const response = await request(server)
    .post("/auth/login")
    .send({
        email: "admin@gmail.com",
        senha: "admin"
    })
    return response.body.token
}

describe('Testes de pessoas', () => {
    // Criando uma pessoa normal com todos os dados corretos
    it('should create a new pessoa', async () => {
        const token = await login()
        
        const pessoa = {
            nome: `aaaa${uuid()}`,
            nascimento: new Date(98, 1).toISOString(),
            cargo: `${uuid()}`.substring(0, 10),
            salario: `${Math.floor(Math.random() * (10000 - 5000) + 500)}`
        }

        const response = await request(server)
        .post("/pessoas")
        .set("Authorization", `bearer ${token}`)
        .send(pessoa)

        expect(response.status).toBe(201)
        pessoaId = response.body.data.id
    })

    // Criando uma pessoa, só que a data de nascimento dela não vai ser válida
    it('should not create a person with an invalid bith date', async () => {
        const token = await login()
        
        const pessoa = {
            nome: `aaaa${uuid()}`,
            nascimento: new Date().toISOString(),
            cargo: `${uuid()}`.substring(0, 10),
            salario: `${Math.floor(Math.random() * (10000 - 5000) + 500)}`
        }

        const response = await request(server)
        .post("/pessoas")
        .set("Authorization", `bearer ${token}`)
        .send(pessoa)

        expect(response.status).toBe(400)
    })

    // Criando uma pessoa, só que o salario dela não é um úmero
    it('should not create a person with an invalid salary', async () => {
        const token = await login()
        
        const pessoa = {
            nome: `aaaa${uuid()}`,
            nascimento: new Date(98, 1).toISOString(),
            cargo: `${uuid()}`.substring(0, 10),
            salario: `aaaa${uuid()}`
        }

        const response = await request(server)
        .post("/pessoas")
        .set("Authorization", `bearer ${token}`)
        .send(pessoa)

        expect(response.status).toBe(400)
    })

    // Apagando uma pessoa
    it('should delete a pessoa', async () => { 
        const token = await login()

        const response = await request(server)
        .delete(`/pessoas/${pessoaId}`)
        .set("Authorization", `bearer ${token}`)
        
        expect(response.status).toBe(200)
    })

    // Editando uma pessoa
    it('should update a pessoa', async () => {
        const token = await login()

        let pessoa = {
            nome: `aaaa${uuid()}`,
            nascimento: new Date(98, 1).toISOString(),
            cargo: `${uuid()}`.substring(0, 10),
            salario: `${Math.floor(Math.random() * (10000 - 5000) + 500)}`
        }

        // Cadastrando uma pessoa
        const response1 = await request(server)
        .post("/pessoas")
        .set("Authorization", `bearer ${token}`)
        .send(pessoa)
        expect(response1.status).toBe(201)
        
        // Mudando os dados dessa pessoa
        pessoa = {
            nome: `aaaa${uuid()}`,
            nascimento: new Date(98, 1).toISOString(),
            cargo: `${uuid()}`.substring(0, 10),
            salario: `${Math.floor(Math.random() * (10000 - 5000) + 500)}`
        }
        const response2 = await request(server)
        .put(`/pessoas/${response1.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
        .send(pessoa)

        expect(response2.status).toBe(200)
        expect(response2.body.data.nome).toBe(pessoa.nome)
        expect(response2.body.data.nascimento).toBe(`${pessoa.nascimento}`)
        expect(response2.body.data.cargo).toBe(pessoa.cargo)
        expect(response2.body.data.salario).toBe(pessoa.salario)

        // Removendo a pessoa do banco
        await request(server)
        .delete(`/pessoas/${response1.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
    })

    // Tentando cadastrar com um nome grande
    it('should not create a pessoa with an long name', async () => {
        const token = await login()

        const longName = `${uuid()}${uuid()}${uuid()}${uuid()}`
        const pessoa = {
            nome: longName,
            fotoPadraoId: 1,
            pessoas: []
        }

        const response1 = await request(server)
        .post("/pessoas")
        .set("Authorization", `bearer ${token}`)
        .send(pessoa)
        expect(response1.status).toBe(400)
    })
})
    
