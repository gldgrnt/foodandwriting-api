const Email = require('email-templates')
const nodemailer = require('nodemailer')
const config = require('../config')
const path = require('path')

// Create transport
const transport = nodemailer.createTransport({
    host: config.mail.smtp.host,
    port: config.mail.smtp.port,
    secure: true, // true for 465, false for other ports
    auth: {
        user: config.mail.user,
        pass: config.mail.pass,
    },
})

// Create email instance 
const email = new Email({
    views: {
        root: path.resolve('app/views/emails/templates')
    },
    juice: true,
    juiceResources: {
        preserveImportant: true,
        webResources: {
            relativeTo: path.resolve('app/views/emails/assets'),
        }
    },
    transport,
    // Uncomment below to send in development
    // send: true
})

/**
 * Helper to semd email - info logged in dev environment
 * @param {Object} emailConfig Email config
 * @param {String} emailConfig.template Email template
 * @param {Object} emailConfig.message Object containing recipient and sender email
 * @param {String} emailConfig.message.to Recipient
 * @param {String} emailConfig.message.from Sender
 * @param {Objects} emailConfig.locals Local vars for pug template
 */
exports.sendEmail = async (emailConfig) => {
    // Add app url to local variables
    emailConfig.locals.appUrl = config.app.url
    await email.send(emailConfig)
    console.log('Email sent')
}
