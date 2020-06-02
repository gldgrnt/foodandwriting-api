const { sendEmail } = require('../helpers').email

/**
 * Send verification email to user
 * @param {object} row Database row
 * @param {string} row.email Recipient email address
 * @param {string} row.id Comment id
 * @returns {Promise} Call sendEmail 
 */
exports.sendVerificationEmail = async ({ email, id }) => {
    const template = 'verifyComment'
    const message = {
        to: email,
        from: '"Food and writing" <info@foodandwriting.co.uk>'
    }
    const locals = {
        id,
    }

    return sendEmail({ template, message, locals })
}