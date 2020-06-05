const { sendEmail } = require('../../helpers').email

/**
 * Send replied email to user
 * @param {object} row Database row
 * @param {string} row.post_slug Recipient email address
 * @param {string} row.email Recipient email address
 * @param {string} row.id Comment id
 * @returns {Promise} Call sendEmail 
 */
module.exports = async ({ email, id, post_slug }) => {
    const template = 'comment-replied'
    const message = {
        to: email,
        from: '"Food and writing" <info@foodandwriting.co.uk>'
    }
    const locals = {
        id,
        postSlug: post_slug
    }

    return sendEmail({ template, message, locals })
}