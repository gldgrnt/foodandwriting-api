const { sendEmail } = require('../helpers').email

/**
 * Send verification email to user
 * @param {string} email Recipient email address
 * @param {string} id Comment id
 * @param {string} displayName Display name
 * @returns {Promise} Call sendEmail 
 */
exports.sendVerificationEmail = async (email, id, displayName) => {
    const template = 'verifyComment'
    const message = {
        to: email,
        from: '"Food and writing" <info@foodandwriting.co.uk>'
    }
    const locals = {
        id,
        displayName
    }

    return sendEmail({ template, message, locals })
}