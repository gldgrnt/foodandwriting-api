const Router = require('express-promise-router')
const { RepliesController } = require('../controllers')
const { repliesValidation } = require('../middleware').validation
const { apiKey } = require('../middleware').authentication

// Destructure methods
const { authenticateApiKey } = apiKey
const { validateReply, validateReplyUpdate, validateReplyId } = repliesValidation

// Instatiate objects
const controller = new RepliesController()
const router = new Router()

// Use apiKey middleware for all routes
router.use(authenticateApiKey)

// Define routes
router.post('/', [validateReply], controller.addReply)
router.put('/', [validateReplyUpdate], controller.updateReply)
router.delete('/:id', [validateReplyId], controller.deleteReply)

module.exports = router
