const { param, body } = require('express-validator')

exports.addComment = [
    body('postId').not().isEmpty().isString().trim(),
    body('displayName').not().isEmpty().isString().escape().trim(),
    body('postSlug').not().isEmpty().isSlug().trim(),
    body('parentCommentId').toInt(),
    body('text').not().isEmpty().escape().trim()
]

exports.approveComment = [
    param('id').not().isEmpty().toInt()
]

exports.deleteComment = [
    param('id').not().isEmpty().toInt()
]