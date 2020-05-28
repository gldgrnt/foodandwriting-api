const { param, body } = require('express-validator')
const { validate } = require('../../helpers').validation

exports.addComment = validate([
    body('postId').not().isEmpty().isString().trim(),
    body('displayName').not().isEmpty().isString().escape().trim(),
    body('postSlug').not().isEmpty().isSlug().trim(),
    body('parentCommentId').toInt(),
    body('text').not().isEmpty().escape().trim()
])

exports.approveComment = validate([
    param('id').not().isEmpty().toInt()
])

exports.deleteComment = validate([
    param('id').not().isEmpty().toInt()
])