const { param, body } = require('express-validator')
const { validate } = require('../../../helpers').validation

exports.validateComment = validate([
    body('displayName').notEmpty().isString().escape().trim(),
    body('email').notEmpty().isEmail(),
    body('postId').notEmpty().isString().trim(),
    body('postSlug').notEmpty().isSlug().trim(),
    body('text').notEmpty().escape().trim()
])

exports.validateCommentId = validate([
    param('id').notEmpty().isString()
])