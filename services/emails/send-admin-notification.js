const { sendEmail } = require('../../helpers').email
const { mail } = require('../../config')

/**
 * Notify admin
 * @param {object} row Database row
 * @param {string} row.post_slug Post slug
 * @returns {Promise} Call sendEmail 
 */
module.exports = async ({ post_slug }) => {
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