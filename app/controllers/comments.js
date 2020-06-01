const { CommentsModel, RepliesModel } = require('../models')
const { sendVerificationEmail } = require('../email').comments
const { appendReplies } = require('../services')

class CommentsController {
    /**
     * Get all comments
     */
    async getAll(req, res) {
        try {
            const comments = new CommentsModel()
            const replies = new RepliesModel()
            // Get all rows
            const allComments = await comments.selectAll()
            const allReplies = await replies.selectAll()
            // Append replies
            const data = appendReplies(allComments, allReplies)
            return res.status(200).json(data)
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
            const replies = new RepliesModel()
            // Get comments
            const postId = req.params.postId
            const selectedComments = await comments.selectByPostId(postId)
            // Get associated replies
            const selectedCommentsString = selectedComments.rows.map(comment => `'${comment.id}'`).toString()
            const selectedReplies = await replies.selectByCommentId(selectedCommentsString)
            // Append replies
            const data = appendReplies(selectedComments, selectedReplies)
            return res.status(200).json(data)
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
            const { rows } = await comments.add(body)
            // Check if comment was added
            if (!rows.length) {
                return res.status(500).json({ message: "Comment could not be created" })
            }
            // Send verification email
            await sendVerificationEmail(rows[0])
            return res.status(201).json({ message: "Comment created" })
        } catch (err) {
            throw err
        }
    }

    /**
     * Approve a comment
     */
    async approveComment(req, res) {
        const { id } = req.params
        const comments = new CommentsModel()
        const { rows } = await comments.approveComment(id)

        if (!rows.length || rows[0].id !== id || rows[0].approved !== true) {
            return res.status(500).json({ message: "Comment could not be approved" })
        }

        return res.status(200).json({ message: "Comment approved" })
    }

    /**
     * Delete comment
     */
    async deleteComment(req, res) {
        const { id } = req.params
        const comments = new CommentsModel()
        const { rows } = await comments.delete(id)

        if (!rows.length) {
            return res.status(500).json({ message: "Comment could not be deleted" })
        }

        if (parseInt(rows[0].count) !== 1) {
            return res.status(409).json({ message: "Comment has already been deleted / or doesn't exist" })
        }

        return res.status(200).json({ message: "Comment deleted" })
    }
}

module.exports = CommentsController