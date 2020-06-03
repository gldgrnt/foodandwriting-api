const { nanoid } = require('nanoid')
const db = require('../../db')

class RepliesModel {
    constructor() {
        this.db = db
        this.table = 'replies'
        this.foreignTable = 'comments'
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
    async selectByCommentIds(commentIds) {
        const queryString = `
            SELECT *
            FROM ${this.table} 
            WHERE comment_id IN (${commentIds})
            ORDER BY date DESC;
        `
        return this.db.query(queryString)
    }

    /**
     * Add a reply
     */
    async add({ text, commentId }) {
        // TODO: return slug of corresponding comment
        const queryString = `
            INSERT INTO ${this.table} (text, comment_id)
            VALUES ($1, $2)
            RETURNING id;
        `
        const params = [text, commentId]
        return this.db.query(queryString, params)
    }
}

module.exports = RepliesModel