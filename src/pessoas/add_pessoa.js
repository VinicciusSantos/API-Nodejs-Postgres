const express = require("express");
const pessoas = express.Router();
var cliente = require("../../cmd/database/connection.js");
const multer = require('multer');

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

        // Indica o novo nome do arquivo:
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});

const upload = multer({ storage });

// Inserindo pessoas
pessoas.post("/pessoas", upload.single('foto'), (req, res) => {
    const body = req.body;
    cliente
        .query(`INSERT INTO pessoas (pe_nome, pe_cargo, pe_salario, pe_data_nasc, pe_status)
                VALUES ($1, $2, $3, $4, $5)`, [ body.pe_nome, body.pe_cargo, body.pe_salario, body.pe_data_nasc, "Não Iniciado",])
        .then((results) => {
            return res.json("Inserido com sucesso!");
        })
        .catch(e => {           
            return res.status(400).json(e)
        })
});

module.exports = pessoas;