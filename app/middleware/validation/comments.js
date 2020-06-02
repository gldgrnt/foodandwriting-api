const { param, body } = require('express-validator')
const { validate } = require('../../helpers').validation

exports.addComment = validate([
    body('displayName').notEmpty().isString().escape().trim(),
    body('email').notEmpty().isEmail(),
    body('postId').notEmpty().isString().trim(),
    body('postSlug').notEmpty().isSlug().trim(),
    body('text').notEmpty().escape().trim()
])

exports.verifyComment = validate([
    param('id').notEmpty().isString()
])

exports.approveComment = validate([
    param('id').notEmpty().toInt()
])

exports.deleteComment = validate([
    param('id').notEmpty().toInt()
])