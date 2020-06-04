const Router = require('express-promise-router')
const { CommentsController } = require('../controllers')
const { commentValidation } = require('../middleware').validation
const { okta } = require('../middleware').authentication

// Destructure methods
const { verifyToken } = okta
const { validateComment, validateCommentId } = commentValidation

// Instatiate objects
const controller = new CommentsController()
const router = new Router() // Instantiate express router with promise functionality

// Define routes
router.get('/', [verifyToken], controller.getAll)
router.get('/:postId', [verifyToken], controller.getCommentsByPostId)
router.post('/', [verifyToken, validateComment], controller.addComment)
router.get('/v/:id', [validateCommentId], controller.verifyComment)
router.put('/a/:id', [verifyToken, validateCommentId], controller.approveComment)
router.delete('/:id', [verifyToken, validateCommentId], controller.deleteComment)

module.exports = router
