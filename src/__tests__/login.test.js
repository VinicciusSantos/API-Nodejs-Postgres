const server = require('../webservice/main')
const request = require('supertest');
const uuid = require('uuid').v4

describe("Login Tests", () => {
    // Cadastrando um usuario e vendo se é possível fazer login com ele
    it("should login", async () => {
        const senha = uuid()
        let user = {
            nome: uuid(),
            email: `${uuid()}@gmail.com`,
            senha: senha,
            confirmacao: senha
        }

        const response = await request(server)
        .post('/auth/cadastro')
        .send(user)
        expect(response.status).toBe(201)

        const login = await request(server)
        .post("/auth/login")
        .send(user)
        expect(login.status).toBe(200)
        expect(login.body.auth).toBe(true)
    })
    
    // Cadastrando um usuario e vendo se é possível fazer login com a senha errada
    it("should login", async () => {
        const senha = uuid()
        let user = {
            nome: uuid(),
            email: `${uuid()}@gmail.com`,
            senha: senha,
            confirmacao: senha
        }

        const response = await request(server)
        .post('/auth/cadastro')
        .send(user)
        expect(response.status).toBe(201)

        const login = await request(server)
        .post("/auth/login")
        .send({
            nome: user.nome,
            senha: uuid()
        })
        expect(login.status).toBe(400)
        expect(login.body.auth).toBe(false)
    })

    // Tentando fazer login com um usuário inexistente
    it("should login", async () => {
        let user = {
            nome: uuid(),
            senha: uuid()
        }

        const login = await request(server)
        .post("/auth/login")
        .send(user)
        expect(login.status).toBe(400)
        expect(login.body.auth).toBe(false)
    })
})

