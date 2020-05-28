const Router = require('express-promise-router')
const db = require('../db')
const { CommentsController } = require('../controllers')
const { commentValidation } = require('../validation')
const { validate } = require('../helpers').validation

// Instatiate objects
const commentsController = new CommentsController()
const router = new Router() // Instantiate express router with promise functionality
module.exports = router

/**
 * Define routes
 */
router.get('/', commentsController.getAll)
router.get('/:postId', commentsController.getCommentsByPostId)
router.post('/add', validate(commentValidation.addComment), commentsController.addComment)


/**
 * Approve a comment
 */
router.put('/approve/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        await db.query('UPDATE comments SET approved = TRUE WHERE id = $1', [id])
        res.status(200).json({ status: 'success', message: `Approved comment with ID: ${id}` })
    } catch (err) {
        throw err
    }
})


/**
 * Delete a comment
 */
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id)

    try {
        await db.query('DELETE FROM comments WHERE id = $1', [id])
        res.status(200).json({ status: 'success', message: `Deleted comment with ID: ${id}` })
    } catch (err) {
        throw err
    }
})