var app = require('@forkjs/group-router')
var handlerProjeto = require('./handler')

app.group('/projetos', function(){
    app.get("/status", handlerProjeto.VerStatus)
    app.get("/status/:status", handlerProjeto.BuscarPorStatus)

    app.get("/:id", handlerProjeto.BuscarPorId)
    app.get("/", handlerProjeto.BuscarProjetos)
    app.post("/", handlerProjeto.NovoProjeto)
    app.put("/:id", handlerProjeto.Edit)
    app.delete("/:id", handlerProjeto.Delete)

    app.post("/:pr/tarefas/:tr", handlerProjeto.VincularProjetoTarefa)

})

module.exports = app.router