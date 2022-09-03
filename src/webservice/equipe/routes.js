const express = require('express')
const router = express.Router();
const handlerEquipe = require('./handler')

router.get("/:id", handlerEquipe.BuscarPorId)
router.get("/", handlerEquipe.BuscarEquipes)
router.post("/", handlerEquipe.NovaEquipe)
router.put("/:id", handlerEquipe.Edit)
router.delete("/:id", handlerEquipe.Delete)

module.exports = router