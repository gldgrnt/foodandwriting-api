const nodemailer = require('nodemailer')
const { mail, isProduction } = require('../config')

const getTransporter = async () => {
    let account = mail
    let secure = true

    // Override variables for dev env
    if (!isProduction) {
        account = await nodemailer.createTestAccount()
        secure = false
    }

    // Create transporter object
    return nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure, // true for 465, false for other ports
        auth: {
            user: account.user,
            pass: account.pass,
        },
    })
}

/**
 * Helper to semd email - info logged in dev environment
 * @param {Object} config Email configuration
 * @param {String} config.from Sender
 * @param {String} config.to Recipient
 * @param {String} config.subject Email subject
 * @param {String} config.text Text version of email content
 * @param {String} config.html HTML version of email content
 */
exports.sendEmail = async config => {
    const transporter = await getTransporter()
    const info = await transporter.sendMail(config)

    if (isProduction) {
        return
    }

    // Log info about the message and a link to view the ethereal mail
    console.log("Message sent: %s", info.messageId)
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}
