var app = require('@forkjs/group-router')
var handlerEquipe = require('./handler')

app.group('/equipes', function(){
    app.get("/:id", handlerEquipe.BuscarPorId)
    app.get("/", handlerEquipe.BuscarEquipes)
    app.post("/", handlerEquipe.NovaEquipe)
    app.put("/:id", handlerEquipe.Edit)
    app.delete("/:id", handlerEquipe.Delete)
})

module.exports = app.router