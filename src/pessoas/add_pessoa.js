const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");
const multer = require('multer');

var pe_foto = ""
// Configuração de armazenamento
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // Extração da extensão do arquivo original:
        const extensaoArquivo = file.originalname.split('.')[1];

        // Cria um código randômico que será o nome do arquivo
        const novoNomeArquivo = require('crypto')
            .randomBytes(64)
            .toString('hex');

        pe_foto = `${novoNomeArquivo}.${extensaoArquivo}`

        // Indica o novo nome do arquivo:
        cb(null, pe_foto)
    }
});

const upload = multer({ storage });

// Inserindo pessoas
pessoas.post("/pessoas", upload.single('foto'), (req, res) => {
    const body = req.body;

    if (body.pe_nome === "" || !body.pe_nome) {
        return res.status(400).json('Nome Inválido')
    }
    
    cliente
    .query(`INSERT INTO pessoas (pe_nome, pe_cargo, pe_salario, pe_data_nasc, pe_status, pe_foto)
    VALUES ($1, $2, $3, $4, $5, $6)`, [ body.pe_nome, body.pe_cargo, body.pe_salario, body.pe_data_nasc, "Não Iniciado", pe_foto])
    .then((results) => {
        return res.json(`https://api-brisa-nodejs-postgresql.herokuapp.com/uploads/${pe_foto}`);
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});

module.exports = pessoas;