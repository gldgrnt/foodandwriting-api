const db = require('../db')
const nanoid = require('nanoid')

class CommentsModel {
    constructor() {
        this.db = db
        this.table = 'comments'
        this.id = nanoid()
    }

    /**
     * Select all comments
     */
    async selectAll() {
        const queryString = `
            SELECT * FROM ${this.table} 
            ORDER BY date DESC;
        `
        return this.db.query(queryString)
    }

    /**
     * Select by post id
     */
    async selectByPostId(postId) {
        const queryString = `
            SELECT * FROM ${this.table} 
            WHERE post_id = $1 
            ORDER BY date DESC;
        `

        const params = [postId]
        return this.db.query(queryString, params)
    }

    /**
     * Add comment
     */
    async add({ displayName, email, postId, postSlug, text }) {
        const queryString = `
            INSERT INTO ${this.table} (id, display_name, email, post_id, post_slug, text) 
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email, display_name;
        `
        const params = [this.id, displayName, email, postId, postSlug, text]
        return this.db.query(queryString, params)
    }

    /**
     * Approve comment
     */
    async approve(id) {
        const queryString = `
            UPDATE ${this.table} 
            SET approved = TRUE 
            WHERE id = $1 
            RETURNING id, approved;
        `
        const params = [id]
        return this.db.query(queryString, params)
    }

    /**
     * Delete comment
     */
    async delete(id) {
        const queryString = `
            WITH a AS (DELETE FROM ${this.table} WHERE id = $1 RETURNING 1)
            SELECT count(*) FROM a;
        `

        const params = [id]
        return this.db.query(queryString, params)
    }
}

module.exports = CommentsModel