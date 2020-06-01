
const db = require('../db')
const { nanoid } = require('nanoid')

class RepliesModel {
    constructor() {
        this.db = db
        this.table = 'replies'
        this.id = nanoid()
    }

    /**
     * Add comment
     */
    async add({ text, commentId }) {
        const queryString = `
            INSERT INTO ${this.table} (text, comment_id) 
            VALUES ($1, $2)
            RETURNING id;
        `
        const params = [text, commentId]
        return this.db.query(queryString, params)
    }
}

module.exports = CommentsModel