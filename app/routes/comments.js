const Router = require('express-promise-router')
const { CommentsController } = require('../controllers')
const { commentValidation } = require('../middleware').validation
const { apiKey } = require('../middleware').authentication

// Destructure methods
const { authenticateApiKey } = apiKey
const { validateComment, validateCommentId } = commentValidation

// Instatiate objects
const controller = new CommentsController()
const router = new Router()

// Use apiKey middleware for all routes
router.use(authenticateApiKey)

// Define routes
router.get('/', controller.getAll)
router.get('/posts/', controller.getAllPosts) // Add amount of comments and replies for each
router.get('/:postId', controller.getCommentsByPostId)
router.post('/', [validateComment], controller.addComment)
router.get('/v/:id', [validateCommentId], controller.verifyComment)
router.put('/a/:id', [validateCommentId], controller.approveComment)
router.delete('/:id', [validateCommentId], controller.deleteComment)

module.exports = router
