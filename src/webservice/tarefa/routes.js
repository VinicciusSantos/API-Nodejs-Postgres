const express = require('express');
const router = express.Router();
var handlerTarefa = require('./handler')

router.get("/status", handlerTarefa.VerStatus)
router.get("/status/:status", handlerTarefa.BuscarPorStatus)
router.put("/:id/status/:status", handlerTarefa.MudarStatus)

router.get("/prioridade/:prioridade", handlerTarefa.BuscarPelaPrioridade)

router.post("/", handlerTarefa.NovaTarefa)
router.get("/", handlerTarefa.BuscarTarefas)
router.get("/:id", handlerTarefa.BuscarPorId)
router.put("/:id", handlerTarefa.Edit)
router.delete("/:id", handlerTarefa.Delete)
router.put("/:id/check/:status", handlerTarefa.CheckAllSubTarefas)

module.exports = router