const express = require('express');
const router = express.Router();
var handlerTarefa = require('./handler')

router.post("/", handlerTarefa.NovaTarefa)
router.get("/", handlerTarefa.BuscarTarefas)
router.get("/:id", handlerTarefa.BuscarPorId)
router.put("/:id", handlerTarefa.Edit)
router.delete("/:id", handlerTarefa.Delete)

module.exports = router