const Router = require('express-promise-router')
const db = require('../db')
const { CommentsController } = require('../controllers')
const { commentValidation } = require('../middleware').validation
const { validate } = require('../helpers').validation

// Instatiate objects
const commentsController = new CommentsController()
const router = new Router() // Instantiate express router with promise functionality
module.exports = router

// Define routes
router.get('/', commentsController.getAll)
router.get('/:postId', commentsController.getCommentsByPostId)
router.post('/add', validate(commentValidation.addComment), commentsController.addComment)
router.put('/approve/:id', validate(commentValidation.approveComment), commentsController.approveComment)
router.delete('/delete/:id', validate(commentValidation.deleteComment), commentsController.deleteComment)