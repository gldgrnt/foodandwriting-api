const Router = require('express-promise-router')
const { CommentsController } = require('../controllers')
const { commentValidation } = require('../middleware').validation
const { okta } = require('../middleware').authentication

// Instatiate objects
const commentsController = new CommentsController()
const router = new Router() // Instantiate express router with promise functionality

// Define routes
router.get('/', [okta.verifyToken], commentsController.getAll)
router.get('/:postId', [okta.verifyToken], commentsController.getCommentsByPostId)
router.post('/', [okta.verifyToken, commentValidation.validateComment], commentsController.addComment)
router.get('/v/:id', [commentValidation.validateCommentId], commentsController.verifyComment)
router.put('/a/:id', [okta.verifyToken, commentValidation.validateCommentId], commentsController.approveComment)
router.delete('/:id', [okta.verifyToken, commentValidation.validateCommentId], commentsController.deleteComment)

module.exports = router
