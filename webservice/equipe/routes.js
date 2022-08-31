var app = require('@forkjs/group-router')
var handlerEquipe = require('./handler')

app.group('/equipes', function(){
    app.get("/", handlerEquipe.BuscarEquipes)
    app.post("/", handlerEquipe.NovaEquipe)
})

module.exports = app.router