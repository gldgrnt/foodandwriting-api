const { CommentsModel } = require('../models')
const { validation } = require('../helpers')

class CommentsController {
    /**
     * Get all comments
     */
    async getAll(req, res) {
        try {
            const comments = new CommentsModel()
            const { rows } = await comments.selectAll()
            return res.status(200).json(rows)
        } catch (err) {
            throw err
        }
    }

    /**
     * Get comment by page
     */
    async getCommentsByPostId(req, res) {
        const { hasErrors, errors } = validation.checkErrors(req)
        if (hasErrors) return res.status(400).json({ errors })

        try {
            const comments = new CommentsModel()
            const postId = req.params.postId
            const { rows } = await comments.selectByPostId(postId)
            return res.status(200).json(rows)
        } catch (err) {
            throw err
        }
    }

    /**
     * Add a new comment
     */

}

module.exports = CommentsController