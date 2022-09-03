const express = require('express');
const router = express.Router();
var handlerProjeto = require('./handler')

router.get("/status", handlerProjeto.VerStatus)
router.get("/status/:status", handlerProjeto.BuscarPorStatus)
router.put("/:id/status/:status", handlerProjeto.MudarStatus)

router.post("/", handlerProjeto.NovoProjeto)
router.get("/", handlerProjeto.BuscarProjetos)
router.get("/:id", handlerProjeto.BuscarPorId)
router.put("/:id", handlerProjeto.Edit)
router.delete("/:id", handlerProjeto.Delete)

router.post("/:pr/tarefas/:tr", handlerProjeto.VincularProjetoTarefa)

module.exports = router