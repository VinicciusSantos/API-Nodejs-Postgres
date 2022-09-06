const express = require('express')
const router = express.Router();
const multer = require('multer');
const multerConfig = require('../../middlewares/multer');
const handlerEquipe = require('./handler')

router.get("/fotos", handlerEquipe.BuscarFotos)
router.post("/fotos", multer(multerConfig).single('foto'), handlerEquipe.AddFoto)

router.post("/", handlerEquipe.NovaEquipe)
router.get("/", handlerEquipe.BuscarEquipes)
router.get("/:id", handlerEquipe.BuscarPorId)
router.put("/:id", handlerEquipe.Edit)
router.delete("/:id", handlerEquipe.Delete)

router.post("/:eq/pessoas/:pe", handlerEquipe.AssociaPessoa)

module.exports = router