const express = require('express');
const router = express.Router();
var handlerSubTarefa = require('./handler')


router.get("/", handlerSubTarefa.BuscarSubTarefas)
router.post("/", handlerSubTarefa.NovaSubTarefa)
router.get("/:id", handlerSubTarefa.BuscarPorId)
router.put("/:id", handlerSubTarefa.Edit)
router.delete("/:id", handlerSubTarefa.Delete)
router.put("/:id/status/:status", handlerSubTarefa.UpdateSubtarefaStatus)

module.exports = router