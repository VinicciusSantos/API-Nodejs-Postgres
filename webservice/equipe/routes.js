var app = require('@forkjs/group-router')
var handlerEquipe = require('./handler')

app.group('/equipes', function(){
    app.post("/", handlerEquipe.NovaEquipe)
})

module.exports = app.router