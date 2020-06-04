const { RepliesModel } = require('../models')
// const { sendRepliedEmail } = require('../../services').emails
// const config = require('../../config')

class RepliesController {
    /**
     * Add a new reply
     */
    async addReply(req, res) {
        try {
            const { body } = req
            const replies = new RepliesModel()
            // Check there isn't already a reply for the comment
            const check = await replies.selectByCommentIds(`'${body.commentId}'`) // expecting `'string', 'string',...`
            if (check.rows.length) {
                return res.status(409).json(check.rows)
            }
            // Check if required info has been returned
            const added = await replies.add(body)
            if (!added.rows.length || added.rows[0].id !== body.commentId || !added.rows[0].email || !added.rows[0].post_slug) {
                return res.status(500).json({ message: 'There was an error adding the reply' })
            }
            // TODO: send approved and replied email
            // await sendRepliedEmail(rows[0])
            return res.status(201).json(rows)
        } catch (err) {
            throw err
        }
    }

    /**
     * Update reply
     */


    /**
     * Delete reply
     */
}

module.exports = RepliesController