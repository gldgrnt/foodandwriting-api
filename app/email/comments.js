const { sendEmail } = require('../helpers').email
const { mail } = require('../config')

/**
 * Send verification email to user
 * @param {object} row Database row
 * @param {string} row.email Recipient email address
 * @param {string} row.id Comment id
 * @returns {Promise} Call sendEmail 
 */
exports.sendVerificationEmail = async ({ email, id }) => {
    const template = 'verify-comment'
    const message = {
        to: email,
        from: '"Food and writing" <info@foodandwriting.co.uk>'
    }
    const locals = {
        id,
    }

    return sendEmail({ template, message, locals })
}


/**
 * Notify admin
 * @param {object} row Database row
 * @param {string} row.post_slug Post slug
 * @returns {Promise} Call sendEmail 
 */
exports.sendAdminNotification = async ({ post_slug }) => {
    const template = 'notify-admin'
    const message = {
        to: mail.admin,
        from: '"Food and writing site" <info@foodandwriting.co.uk>'
    }
    const locals = {
        post_slug
    }

    return sendEmail({ template, message, locals })
}