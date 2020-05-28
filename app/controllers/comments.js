const { CommentsModel } = require('../models')

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
    async addComment(req, res) {
        try {
            const { body } = req
            const comments = new CommentsModel()
            const { rows } = await comments.addComment(body)
            if (!rows) return res.status(500).json({ Message: "Comment could not be created" })
            return res.status(201).json({ Message: "Comment created" })
        } catch (err) {
            throw err
        }
    }
}

module.exports = CommentsController