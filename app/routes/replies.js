const Router = require('express-promise-router')
const { RepliesController } = require('../controllers')
const { repliesValidation } = require('../middleware').validation
const { okta } = require('../middleware').authentication

// Destructure methods
const { verifyToken } = okta
const { validateReply } = repliesValidation

// Instatiate objects
const controller = new RepliesController()
const router = new Router() // Instantiate express router with promise functionality

// Define routes
router.post('/', [verifyToken, validateReply], controller.addReply)
// router.put('/:id', [verifyToken, validateReplyId], controller.updateReply)
// router.delete('/:id', [verifyToken, validateReplyId], controller.deleteReply)

module.exports = router
