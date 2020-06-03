const { CommentsModel, RepliesModel } = require('../models')
// const { sendRepliedEmail } = require('../../services').emails
const config = require('../../config')

class RepliesController {
    /**
     * Add a new reply
     */
    async addReply(req, res) {
        try {
            const { body } = req
            const replies = new RepliesModel()
            const { rows } = await replies.add(body)
            // TODO: check if reply was added and comment_slug and email was returned
            // TODO: send approved and replied email
            return res.sendStatus(201)
        } catch (err) {
            throw err
        }
    }
}