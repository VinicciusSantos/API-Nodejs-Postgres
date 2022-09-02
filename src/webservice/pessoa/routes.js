var app = require('@forkjs/group-router')
var handlerPessoa = require('./handler')

app.group('/pessoas', function(){
    app.get("/:id", handlerPessoa.BuscarPorId)
    app.get("/", handlerPessoa.BuscarPessoas)
    app.post("/", handlerPessoa.NovaPessoa)
    app.put("/:id", handlerPessoa.Edit)
    app.delete("/:id", handlerPessoa.Delete)
})

module.exports = app.router