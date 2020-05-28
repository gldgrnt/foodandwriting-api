const { okta } = require('../../config')
const OktaJwtVerifier = require('@okta/jwt-verifier')

// Instantiate objects
const jwtVerifier = new OktaJwtVerifier({
    issuer: `https://${okta.domain}/oauth2/default`,
    clientId: okta.clientId
})


/**
 * Verify token in request
 */
exports.verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization']

    try {
        if (!bearerHeader) {
            res.status(403).json({ message: 'Bearer token missing' })
        }

        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        await jwtVerifier.verifyAccessToken(bearerToken)
        return next()
    } catch (err) {
        res.status(403).json({ message: 'You couldn\'t be authenticated' })
    }
}