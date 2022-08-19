const LocalStrategy = require("passport-local").Strategy
const cliente = require('./database/connection.js')
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
                if (isMatch) return done(null, user)
                else done(null, false, {message: "Senha Incorreta"})
            })
        } else {
            return done(null, false, {message: "Email Não Encontrado"})
        }
    }


    passport.use(new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "senha"
        }, 
        authenticateUser
    ))

    passport.serializeUser((user) => done(null, user.id))
    passport.deserializeUser( async (id, done) => {
        const results = await cliente
                                    .query(`SELECT * FROM users WHERE id = $1`, [id])
                                    .catch(e => {                                  
                                        return res.status(400).json(e)
                                    })

        return done(null, results.rows[0])
    })
}

module.exports = initialize