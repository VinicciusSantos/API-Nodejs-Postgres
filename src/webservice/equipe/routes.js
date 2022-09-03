const express = require('express')
const router = express.Router();
const handlerEquipe = require('./handler')

router.post("/", handlerEquipe.NovaEquipe)
router.get("/", handlerEquipe.BuscarEquipes)
router.get("/:id", handlerEquipe.BuscarPorId)
router.put("/:id", handlerEquipe.Edit)
router.delete("/:id", handlerEquipe.Delete)

router.post("/:eq/pessoas/:pe", handlerEquipe.AssociaPessoa)

module.exports = router