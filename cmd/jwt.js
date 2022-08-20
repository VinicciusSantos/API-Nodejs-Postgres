const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token']
  
    jwt.verify(token, process.env.SECRET, (err, decored) => {
        if (err) return res.status(401).json({message: "Não Autorizado"}).end()

        req.id = decored.id;
        next();
    })
}

module.exports = authenticateToken