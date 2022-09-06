const express = require('express');
const router = express.Router();
var handlerAuth = require('./handler')

router.post("/cadastro", handlerAuth.Cadastro)
router.post("/login", handlerAuth.Login)

module.exports = router