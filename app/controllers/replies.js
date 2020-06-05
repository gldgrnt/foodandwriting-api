const { RepliesModel } = require('../models')
const { sendRepliedEmail } = require('../../services').emails

class RepliesController {
    /**
     * Add a new reply
     */
    async addReply(req, res) {
        try {
            const { body } = req
            const replies = new RepliesModel()
            // Check there isn't already a reply for the comment
            const check = await replies.selectByCommentId(body.commentId)
            if (check.rows.length) {
                return res.status(409).json(check.rows)
            }
            // Check if required info has been returned
            const added = await replies.add(body)
            if (!added.rows.length || added.rows[0].id !== body.commentId || !added.rows[0].email || !added.rows[0].post_slug) {
                return res.status(500).json({ message: 'There was an error adding the reply' })
            }
            // TODO: send approved and replied email
            await sendRepliedEmail(added.rows[0])
            return res.status(201).json(added.rows)
        } catch (err) {
            throw err
        }
    }

    /**
     * Update reply
     */
    async updateReply(req, res) {
        try {
            const { body } = req
            const replies = new RepliesModel()
            // Update reply
            const replied = await replies.update(body)
            if (!replied.rows.length || replied.rows[0].id !== body.id) {
                return res.status(500).json({ message: 'Reply could not be updated' })
            }
            // Return ok
            return res.sendStatus(200)
        } catch (err) {
            throw err
        }
    }

    /**
     * Delete reply
     */
    async deleteReply(req, res) {
        try {
            const { id } = req.params
            const replies = new RepliesModel()
            // Check if reply exists
            const check = await replies.checkById(id)
            if (!check.rows.length || check.rows[0].id !== id) {
                return res.status(404).json({ message: "Reply has already been delete / doesn't exist" })
            }
            // Delete and check if the reply was deleted
            const deleted = await replies.delete(id)
            if (!deleted.rows.length) {
                return res.status(500).json({ message: "Reply could not be deleted" })
            }
            // Send success
            return res.sendStatus(200)
        } catch (err) {
            throw err
        }
    }
}

module.exports = RepliesController