const express = require('express');
const router = express.Router();
var handlerSubTarefa = require('./handler')


router.put("/check/:status/tarefas/:id", handlerSubTarefa.CheckSubTarefas)
router.get("/", handlerSubTarefa.BuscarSubTarefas)
router.get("/:id", handlerSubTarefa.BuscarPorId)
router.post("/", handlerSubTarefa.NovaSubTarefa)
router.put("/:id", handlerSubTarefa.Edit)
router.put("/:id/status/:status", handlerSubTarefa.UpdateSubtarefaStatus)
router.delete("/:id", handlerSubTarefa.Delete)

module.exports = router