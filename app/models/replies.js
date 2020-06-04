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
     * @param commentIds String form of array of comment ids
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
        const queryString = `
            WITH added AS (
                INSERT INTO ${this.table} (id, text, comment_id)
                VALUES ($1, $2, $3)
                RETURNING *
            )
            SELECT id, email, post_slug 
            FROM ${this.foreignTable}
            WHERE id = ( SELECT comment_id FROM added );
        `
        const params = [this.id, text, commentId]
        return this.db.query(queryString, params)
    }
}

module.exports = RepliesModel