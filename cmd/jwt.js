const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const header = req.headers.authorization;
    if (!header){
        return res.status(401).json({message: `Token Inválido!`});
    }
    const token = header.split(' ')[1]
    console.log(req.headers)
  
    jwt.verify(token, process.env.SECRET, (err, decored) => {
        if (err) return res.status(401).json({message: "Não Autorizado"}).end()

        req.id = decored.id;
        next();
    })
}

module.exports = authenticateToken