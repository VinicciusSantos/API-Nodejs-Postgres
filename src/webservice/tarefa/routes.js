var app = require('@forkjs/group-router')
var handlerTarefa = require('./handler')

app.group('/tarefas', function(){
    app.get("/:id", handlerTarefa.BuscarPorId)
    app.get("/", handlerTarefa.BuscarTarefas)
    app.post("/", handlerTarefa.NovaTarefa)
    app.put("/:id", handlerTarefa.Edit)
    app.delete("/:id", handlerTarefa.Delete)
})

module.exports = app.router