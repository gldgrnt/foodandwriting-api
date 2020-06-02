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
    app: {
        url: process.env.APP_URL,
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
        smtp: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
        },
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
}