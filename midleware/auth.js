const Jwt = require('jsonwebtoken')
const config = require('config')
module.exports = function auth(req, res, next) {
    const token = req.header('x-auth-token')
    if (!token) return res.status(401).send('Acces denied .No token provided')
    try {

        const decoded = Jwt.verify(token, config.get('jwtPrivateKey'))
        req.user = decoded
        next()

    } catch (e) {
        res.status(400).send('invalid Token')
    }
}