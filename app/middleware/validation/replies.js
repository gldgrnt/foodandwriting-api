const { body, param } = require('express-validator')
const { validate } = require('../../../helpers').validation

exports.validateReply = validate([
    body('text').notEmpty().escape().trim(),
    body('commentId').notEmpty().isString().trim(),
])

exports.validateReplyUpdate = validate([
    body('id').notEmpty().isString().trim(),
    body('text').notEmpty().escape().trim(),
])

exports.validateReplyId = validate([
    param('id').notEmpty().isString().trim(),
])