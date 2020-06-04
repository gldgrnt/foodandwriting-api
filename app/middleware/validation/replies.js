const { body } = require('express-validator')
const { validate } = require('../../../helpers').validation

exports.validateReply = validate([
    body('text').notEmpty().escape().trim(),
    body('commentId').notEmpty().isString().trim(),
])