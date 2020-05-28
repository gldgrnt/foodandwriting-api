const env = require('dotenv').config()

// Setup NODE_ENV
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (env.error) {
    // Throw error if .env isn't found
    throw new Error('.env file not found')
}

module.exports = {
    db: {
        url: process.env.DATABASE_URL
    },
    server: {
        port: process.env.PORT,
        isProduction: process.env.NODE_ENV === 'production'
    },
    okta: {
        clientId: process.env.OKTA_CLIENT_ID,
        domain: process.env.OKTA_DOMAIN,
        clientSecret: process.env.OKTA_CLIENT_SECRET
    },
    mail: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN
    }
}