const { nanoid } = require('nanoid')
const db = require('../../db')

class RepliesModel {
    constructor() {
        this.db = db
        this.table = 'replies'
        this.id = nanoid()
    }

    /**
     * Select all
     */
    async selectAll() {
        const queryString = `
            SELECT *
            FROM ${this.table} 
            ORDER BY date DESC;
        `
        return this.db.query(queryString)
    }

    /**
     * Select by comment id
     * @param commentIds String form of arary of comment ids
     */
    async selectByCommentId(commentIds) {
        const queryString = `
            SELECT *
            FROM ${this.table} 
            WHERE comment_id IN (${commentIds})
            ORDER BY date DESC;
        `
        return this.db.query(queryString)
    }
}

module.exports = RepliesModel