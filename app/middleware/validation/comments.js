const { param, body } = require('express-validator')
const { validate } = require('../../helpers').validation

exports.addComment = validate([
    body('postId').notEmpty().isString().trim(),
    body('displayName').notEmpty().isString().escape().trim(),
    body('email').notEmpty().isEmail(),
    body('postSlug').notEmpty().isSlug().trim(),
    body('parentCommentId').toInt(),
    body('text').notEmpty().escape().trim()
])

exports.approveComment = validate([
    param('id').notEmpty().toInt()
])

exports.deleteComment = validate([
    param('id').notEmpty().toInt()
])