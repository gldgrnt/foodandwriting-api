const { apiKey } = require('../../../config')

/**
 * Simple authentication using .env api 'key'
 */
exports.authenticateApiKey = (req, res, next) => {
    if (!req.header('apiKey') || req.header('apiKey') !== apiKey) {
        return res.status(401).json({ message: 'Missing or invalid key' })
    }

    next()
}