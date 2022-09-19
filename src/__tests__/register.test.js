const server = require('../webservice/main')
const request = require('supertest');
const uuid = require('uuid').v4

describe('Testes de Cadastro', () => {
    // Criando um usuario normal com todos os dados corretos
    it('should create a new user', async () => {
        const senha = uuid()
        let user = {
            nome: `aaaa${uuid()}`,
            email: `${uuid()}@gmail.com`,
            senha: senha,
            confirmacao: senha
        }
        const response = await request(server)
        .post('/auth/cadastro')
        .send(user)
        
        expect(response.status).toBe(201)
        expect(response.body.data.nome).toBe(user.nome)
        expect(response.body.data.nome).toBe(user.nome)
    })

    // Criando um usuario, mas as senhas não batem
    it('should not post with a wrong password', async () => {
        let user = {
            nome: `aaaa${uuid()}`,
            email: `${uuid()}@gmail.com`,
            senha: uuid(),
            confirmacao: uuid()
        }
        const response = await request(server)
        .post('/auth/cadastro')
        .send(user)

        expect(response.status).toBe(400)
    })

    // Cadatrando dois usuarios iguais pra ver se ele cadastra com dados duplicados
    it('should not post with duplicated email', async () => {
        const senha = uuid()
        let user = {
            nome: `aaaa${uuid()}`,
            email: `${uuid()}@gmail.com`,
            senha: senha,
            confirmacao: senha
        }

        const response1 = await request(server)
        .post('/auth/cadastro')
        .send(user)
        expect(response1.status).toBe(201)

        const response2 = await request(server)
        .post('/auth/cadastro')
        .send(user)
        expect(response2.status).toBe(400)
    })

    // Cadastrando um usuario com um tipo de usuario inválido
    it('should not post with an invalid email', async () => {
        const senha = uuid()
        let user = {
            nome: `aaaa${uuid()}`,
            email: uuid(),
            senha: senha,
            confirmacao: senha
        }

        const response = await request(server)
        .post('/auth/cadastro')
        .send(user)
        expect(response.status).toBe(400)
    })
})
