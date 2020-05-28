const Router = require('express-promise-router')
const db = require('../db')
const { CommentsController } = require('../controllers')
const { commentValidation } = require('../middleware').validation
const { okta } = require('../middleware').authentication

// Instatiate objects
const commentsController = new CommentsController()
const router = new Router() // Instantiate express router with promise functionality

// Add a router level authentication
router.use(okta.verifyToken)

// Define routes
router.get('/', commentsController.getAll)
router.get('/:postId', commentsController.getCommentsByPostId)
router.post('/add', commentValidation.addComment, commentsController.addComment)
router.put('/approve/:id', commentValidation.approveComment, commentsController.approveComment)
router.delete('/delete/:id', commentValidation.deleteComment, commentsController.deleteComment)

module.exports = router
