const server = require('../webservice/main')
const request = require('supertest');
const uuid = require('uuid').v4

const login = async () => {
    const response = await request(server)
    .post("/auth/login")
    .send({
        email: "admin@gmail.com",
        senha: "admin"
    })
    return response.body.token
}

describe('Equipe Tests', () => {
    // Criando uma equipe normal com todos os dados corretos
    it('should create a new "equipe"', async () => {
        const token = await login()
        
        const equipe = {
            nome: uuid(),
            fotoPadraoId: 1,
            pessoas: []
        }

        const response = await request(server)
        .post("/equipes")
        .set("Authorization", `bearer ${token}`)
        .send(equipe)

        expect(response.status).toBe(201)

        await request(server)
        .delete(`/equipes/${response.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
    })

    // Tentando cadastrar uma equipe com dados duplicados
    it('should not create a duplicated Equipe', async () => {
        const token = await login()
        
        const equipe = {
            nome: uuid(),
            fotoPadraoId: 1,
            pessoas: []
        }

        const response1 = await request(server)
        .post("/equipes")
        .set("Authorization", `bearer ${token}`)
        .send(equipe)
        expect(response1.status).toBe(201)

        const response2 = await request(server)
        .post("/equipes")
        .set("Authorization", `bearer ${token}`)
        .send(equipe)
        expect(response2.status).toBe(400)

        await request(server)
        .delete(`/equipes/${response1.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
    })

    // Tentando cadastrar com um nome vazio
    it('should not create a Equipe with an invalid name', async () => {
        const token = await login()
        
        const equipe = {
            nome: "",
            fotoPadraoId: 1,
            pessoas: []
        }

        const response1 = await request(server)
        .post("/equipes")
        .set("Authorization", `bearer ${token}`)
        .send(equipe)
        expect(response1.status).toBe(400)
    })
})

