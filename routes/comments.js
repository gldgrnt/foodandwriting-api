const Router = require('express-promise-router')
const db = require('../db')
const router = new Router() // Instantiate express router with promise functionality
module.exports = router

/**
 * Get all comments
 */
router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM comments ORDER BY date desc', [])
        res.status(200).json(rows)
    } catch (err) {
        throw err
    }
})

/**
 * Get comments by ID
 */
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId

    try {
        const { rows } = await db.query('SELECT * FROM comments WHERE post_id = $1 ORDER BY date DESC', [postId])
        res.status(200).json(rows)
    } catch (err) {
        throw err
    }
})

/**
 * Create a comment
 */
router.post('/', async (req, res) => {
    const { displayName, postId, postSlug, text } = req.body
    const { parentCommentId } = parseInt(req.body.parentCommentId) || 0

    try {
        await db.query('INSERT INTO comments (display_name, post_id, post_slug, parent_comment_id, text) VALUES ($1, $2, $3, $4, $5)',
            [displayName, postId, postSlug, parentCommentId, text])
        res.status(201).json({ status: 'success', message: 'Comment succesfully added.' })
    } catch (err) {
        throw err
    }
})

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