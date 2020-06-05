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
     * @param commentId Comment id string
     */
    async selectByCommentId(commentId) {
        const queryString = `
            SELECT *
            FROM ${this.table} 
            WHERE comment_id = $1
            ORDER BY date DESC;
        `
        const params = [commentId]
        return this.db.query(queryString, params)
    }

    /**
     * Select from multiple comment ids
     * @param commentIds String form of array of comment ids
     */
    async selectFromCommentIds(commentIds) {
        const queryString = `
            SELECT *
            FROM ${this.table} 
            WHERE comment_id IN (${commentIds})
            ORDER BY date DESC;
        `
        return this.db.query(queryString)
    }

    /**
     * Check by id
     */
    async checkById(id) {
        const queryString = `
            SELECT * FROM ${this.table} WHERE id = $1;
        `
        const params = [id]
        return this.db.query(queryString, params)
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

    /**
     * Update a reply
     */
    async update({ id, text }) {
        const queryString = `
            UPDATE ${this.table}
            SET text = $2
            WHERE id = $1
            RETURNING id;
        `
        const params = [id, text]
        return this.db.query(queryString, params)
    }

    /**
     * Delete a reply
     */
    async delete(id) {
        const queryString = `
            WITH deleted AS (DELETE FROM ${this.table} WHERE id = $1 RETURNING 1)
            SELECT count(*) FROM deleted;
        `
        const params = [id]
        return this.db.query(queryString, params)
    }
}

module.exports = RepliesModel