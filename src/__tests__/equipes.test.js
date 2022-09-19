const server = require('../webservice/main')
const request = require('supertest');
const uuid = require('uuid').v4

let equipeId = 0;
const login = async () => {
    const response = await request(server)
    .post("/auth/login")
    .send({
        email: "admin@gmail.com",
        senha: "admin"
    })
    return response.body.token
}

describe('Testes de equipes', () => {
    // Criando uma equipe normal com todos os dados corretos
    it('should create a new equipe', async () => {
        const token = await login()
        
        const equipe = {
            nome: `aaaa${uuid()}`,
            fotoPadraoId: 1,
            pessoas: []
        }

        const response = await request(server)
        .post("/equipes")
        .set("Authorization", `bearer ${token}`)
        .send(equipe)

        expect(response.status).toBe(201)
        equipeId = response.body.data.id
    })

    // Apagando uma Equipe
    it('should delete an equipe', async () => {
        const token = await login()
        
        const response = await request(server)
        .delete(`/equipes/${equipeId}`)
        .set("Authorization", `bearer ${token}`)
        
        expect(response.status).toBe(200)
    })

    // Editando uma Equipe
    it('should update an equipe', async () => {
        const token = await login()
        
        const equipe = {
            nome: `aaaa${uuid()}`,
            fotoPadraoId: 1,
            pessoas: []
        }

        // Cadastrando uma Equipe
        const response1 = await request(server)
        .post("/equipes")
        .set("Authorization", `bearer ${token}`)
        .send(equipe)
        expect(response1.status).toBe(201)
        
        // Mudando os dados dessa equipe
        equipe.nome = `aaaa${uuid()}`
        const response2 = await request(server)
        .put(`/equipes/${response1.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
        .send(equipe)
        expect(response2.status).toBe(200)
        expect(response2.body.data.nome).toBe(equipe.nome)

        // Removendo a equipe do banco
        await request(server)
        .delete(`/equipes/${response1.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
    })

    // Tentando cadastrar uma equipe com dados duplicados
    it('should not create a duplicated Equipe', async () => {
        const token = await login()
        
        const equipe = {
            nome: `aaaa${uuid()}`,
            fotoPadraoId: 1,
            pessoas: []
        }

        const response1 = await request(server)
        .post("/equipes")
        .set("Authorization", `bearer ${token}`)
        .send(equipe)

        const response2 = await request(server)
        .post("/equipes")
        .set("Authorization", `bearer ${token}`)
        .send(equipe)

        if (response1.status == 200) {
            expect(response2.status).toBe(400)
            
            await request(server)
            .delete(`/equipes/${response1.body.data.id}`)
            .set("Authorization", `bearer ${token}`)
        }
    })

    // Tentando cadastrar com um nome grande
    it('should not create a Equipe with a long name', async () => {
        const token = await login()

        const longName = `${`aaaa${uuid()}`}${`aaaa${uuid()}`}${`aaaa${uuid()}`}${`aaaa${uuid()}`}`
        const equipe = {
            nome: longName,
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
    
