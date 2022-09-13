const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API de Gerenciamento de Projetos",
            version: '2.0.0',
        },
        servers: [{url: "https://api-brisa-nodejs-postgresql.herokuapp.com"}, {url: "http://localhost:8000"}],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer"
                }
            }
        }
    },
    apis: ["./src/webservice/*/docs.js", "./src/config/swagger/schemas/*.js"]
};

module.exports = swaggerOptions