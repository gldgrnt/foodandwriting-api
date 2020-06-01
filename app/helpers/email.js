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
 * @param {Object} config Email config
 * @param {String} config.template Email template
 * @param {Object} config.message Object containing recipient and sender email
 * @param {String} config.message.to Recipient
 * @param {String} config.message.from Sender
 * @param {Objects} config.locals Local vars for pug template
 */
exports.sendEmail = async (config) => {
    await email.send(config)
    console.log('Email sent')
}
