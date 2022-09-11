const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gerenciamento de Projetos",
            version: '2.0.0',
        },
        servers: [{url: "http://localhost:8000"}, {url: "https://api-brisa-nodejs-postgresql.herokuapp.com"}],
    },
    apis: ["./src/webservice/*/routes.js"]
};

module.exports = swaggerOptions