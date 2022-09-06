const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../../middlewares/multer');
var handlerPessoa = require('./handler')


router.get("/cargos", handlerPessoa.BuscarCargos)
router.get("/cargos/:cargo", handlerPessoa.BuscarPeloCargo)

router.post("/", multer(multerConfig).single('foto'), handlerPessoa.NovaPessoa)
router.get("/", handlerPessoa.BuscarPessoas)
router.get("/:id", handlerPessoa.BuscarPorId)
router.put("/:id", handlerPessoa.Edit)
router.delete("/:id", handlerPessoa.Delete)

router.post('/:pe/tarefas/:tr', handlerPessoa.VinculaPessoaTarefa)

module.exports = router