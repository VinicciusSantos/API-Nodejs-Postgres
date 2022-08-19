const LocalStrategy = require("passport-local").Strategy
const cliente = require('../../cmd/database/connection.js')
const bcrypt = require('bcrypt')

function initialize(passport) {
    const authenticateUser = async (email, senha, done) => {
        const results = await cliente
                                .query(`SELECT * FROM users WHERE email = $1`, [email])
                                .catch(e => {                                  
                                    return res.status(400).json(e)
                                })
        console.log(results.rows)

        if (results.rows.length > 0) {
            const user = results.rows[0]

            bcrypt.compare(senha, user.senha, (err, isMatch) => {
                if (err) throw err
            })
        }
    }


    passport.use(new LocalStrategy)(
        {
            usernameField: "email",
            passwordField: "senha"
        }, 
        authenticateUser
    )
}