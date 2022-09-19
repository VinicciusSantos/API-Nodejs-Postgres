const server = require('../webservice/main')
const request = require('supertest');
const uuid = require('uuid').v4

let projetoId = 0;
const login = async () => {
    const response = await request(server)
    .post("/auth/login")
    .send({
        email: "admin@gmail.com",
        senha: "admin"
    })
    return response.body.token
}


describe('Testes de Projetos', () => {
    // Criando um projeto normal com todos os dados corretos
    it('should create a new projeto', async () => {
        const token = await login()

        const projeto = {
            nome: `aaaa${uuid()}`,
            descricao: uuid(),
        }

        const response = await request(server)
        .post("/projetos")
        .set("Authorization", `bearer ${token}`)
        .send(projeto)

        expect(response.status).toBe(201)
        projetoId = response.body.data.id
    })

    // Apagando um projeto
    it('should delete a projeto', async () => {
        const token = await login()

        const response = await request(server)
        .delete(`/projetos/${projetoId}`)
        .set("Authorization", `bearer ${token}`)
        
        expect(response.status).toBe(200)
    })

    // Editando um projeto
    it('should update a projeto', async () => {
        const token = await login()

        let projeto = {
            nome: `aaaa${uuid()}`,
            descricao: uuid(),
        }

        // Cadastrando um projeto
        const response1 = await request(server)
        .post("/projetos")
        .set("Authorization", `bearer ${token}`)
        .send(projeto)
        expect(response1.status).toBe(201)
        
        // Mudando os dados dessa projeto
        projeto = {
            nome: `aaaa${uuid()}`,
            descricao: uuid(),
        }
        const response2 = await request(server)
        .put(`/projetos/${response1.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
        .send(projeto)

        expect(response2.status).toBe(200)
        expect(response2.body.data.nome).toBe(projeto.nome)
        expect(response2.body.data.descricao).toBe(projeto.descricao)

        // Removendo a projeto do banco
        await request(server)
        .delete(`/projetos/${response1.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
    })

    // Tentando cadastrar um projeto com dados duplicados
    it('should not create a duplicated projeto', async () => {
        const token = await login()

        projeto = {
            nome: `aaaa${uuid()}`,
            descricao: uuid(),
        }

        const response1 = await request(server)
        .post("/projetos")
        .set("Authorization", `bearer ${token}`)
        .send(projeto)
        expect(response1.status).toBe(201)

        const response2 = await request(server)
        .post("/projetos")
        .set("Authorization", `bearer ${token}`)
        .send(projeto)
        expect(response2.status).toBe(400)

        await request(server)
        .delete(`/projetos/${response1.body.data.id}`)
        .set("Authorization", `bearer ${token}`)
    })

    // Tentando cadastrar com um nome grande
    it('should not create a projeto with an long name', async () => {
        const token = await await login()

        const longName = `${uuid()}${uuid()}${uuid()}${uuid()}`
        const projeto = {
            nome: longName,
            fotoPadraoId: 1,
            pessoas: []
        }

        const response1 = await request(server)
        .post("/projetos")
        .set("Authorization", `bearer ${token}`)
        .send(projeto)
        expect(response1.status).toBe(400)
    })
})
    
