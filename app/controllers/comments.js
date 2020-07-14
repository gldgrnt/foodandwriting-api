const { CommentsModel, RepliesModel } = require('../models')
const { sendVerificationEmail, sendAdminNotificationEmail } = require('../../services').emails
const { appendReplies } = require('../../services').transformers
const { addPugLocals } = require('../../helpers').pug
const config = require('../../config')

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
            // Check for emptiness
            if (!allComments.rows.length) {
                return res.status(204).json({ message: "No comments found" })
            }
            // Append replies
            const data = appendReplies(allComments, allReplies)
            return res.status(200).json(data)
        } catch (err) {
            throw err
        }
    }

    /**
     * Get all post ids
     */
    async getAllPosts(req, res) {
        try {
            const comments = new CommentsModel()
            // Get number of comments per post_id
            const { rows } = await comments.selectAllPosts()
            // Get number of replies per postId
            return res.status(200).json(rows)
        } catch (err) {
            throw err
        }
    }

    /**
     * Get comment by post ids
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
            const selectedReplies = await replies.selectFromCommentIds(selectedCommentsString)
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
            return res.sendStatus(201)
        } catch (err) {
            throw err
        }
    }

    /**
     * Verify comment
     */
    async verifyComment(req, res) {
        try {
            const { id } = req.params
            const comments = new CommentsModel()
            // Check comment exists
            const check = await comments.checkById(id)
            if (!check.rows.length || check.rows[0].id !== id) {
                return res.status(404).json({ message: 'Comment not found' })
            }
            // Check if comment has alredy been verified - to avoid sending duplicated admin emails
            const isVerified = await comments.checkByCol(id, 'verified', 'TRUE')
            if (isVerified.rows.length) {
                return res.render('comment-verified', addPugLocals())
            }
            // Verify comment and check it
            const verified = await comments.verify(id)
            if (!verified.rows.length || verified.rows[0].verified !== true || verified.rows[0].id !== id) {
                return res.sendStatus(500).json({ message: 'Comment could not be verified' })
            }
            // Send email
            await sendAdminNotificationEmail(verified.rows[0])
            return res.render('comment-verified', addPugLocals())
        } catch (err) {
            throw err
        }
    }

    /**
     * Approve a comment
     */
    async approveComment(req, res) {
        try {
            const { id } = req.params
            const comments = new CommentsModel()
            // Check comment exists
            const check = await comments.checkById(id)
            if (!check.rows.length || check.rows[0].id !== id) {
                return res.status(404).json({ message: 'Comment not found' })
            }
            // Check if comment is already approved - to avoid sending duplicate emails
            const isApproved = await comments.checkByCol(id, 'approved', 'TRUE')
            if (isApproved.rows.length) {
                return res.status(200).json({ message: 'Comment already approved' })
            }
            // Approve comment and check it
            const approved = await comments.approve(id)
            if (!approved.rows.length || approved.rows[0].approved !== true || approved.rows[0].id !== id) {
                return res.sendStatus(500).json({ message: 'Comment could not be approved' })
            }
            // Send email
            return res.sendStatus(200)
        } catch (err) {
            throw err
        }
    }

    /**
     * Delete comment
     */
    async deleteComment(req, res) {
        try {
            const { id } = req.params
            const comments = new CommentsModel()
            // Check comment exists
            const check = await comments.checkById(id)
            if (!check.rows.length || check.rows[0].id !== id) {
                return res.status(410).json({ message: "Comment doesn't exist or has already deleted" })
            }
            // Delete the comment
            const deleted = await comments.delete(id)
            if (!deleted.rows.length) {
                return res.status(500).json({ message: "Comment could not be deleted" })
            }
            // Send success
            return res.sendStatus(200)
        } catch (err) {
            throw err
        }
    }
}

module.exports = CommentsController