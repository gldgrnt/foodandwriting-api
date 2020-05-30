const { sendEmail } = require('../helpers').email

// Set from email address
const from = 'info@foodandwriting.co.uk'

/**
 * Send test comment email address
 * @param {string} to Recipient email address
 * @param {string} name Recipient name
 * @returns {Promise} Call sendEmail 
 */
exports.sendCommentEmailTest = async (to, name) => {
    return sendEmail({
        to,
        from,
        subject: 'Test email',
        text: `Hello there ${name}`,
        html: `<strong>Hello there ${name}</strong>`,
    })
}