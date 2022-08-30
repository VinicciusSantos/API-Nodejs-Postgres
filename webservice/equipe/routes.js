var app = require('@forkjs/group-router');
const handlerEquipe = require('./handler')

app.group("/equipes/", function() {
    app.get("",  handlerEquipe.getAll)
})

module.exports = app.router