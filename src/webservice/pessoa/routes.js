const express = require('express');
const router = express.Router();
var handlerPessoa = require('./handler')

router.get("/cargos", handlerPessoa.BuscarCargos)

router.get("/:id", handlerPessoa.BuscarPorId)
router.get("/", handlerPessoa.BuscarPessoas)
router.post("/", handlerPessoa.NovaPessoa)
router.put("/:id", handlerPessoa.Edit)
router.delete("/:id", handlerPessoa.Delete)

module.exports = router