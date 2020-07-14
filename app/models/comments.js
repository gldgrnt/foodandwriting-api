const { nanoid } = require('nanoid')
const db = require('../../db')

class CommentsModel {
    constructor() {
        this.db = db
        this.table = 'comments'
        this.id = nanoid()
    }

    /**
     * Select all
     */
    async selectAll() {
        const queryString = `
            SELECT id, date, display_name, post_id, post_slug, text, verified, approved
            FROM ${this.table} 
            ORDER BY date DESC;
        `
        return this.db.query(queryString)
    }

    /**
     * Select all post ids
     */
    async selectAllPosts() {
        const queryString = `
            SELECT posts.post_id, (
                SELECT date
                FROM ${this.table}
                WHERE post_id = posts.post_id
                ORDER BY date DESC LIMIT 1
            ),
            (
                SELECT count(*) as comments_no
                FROM ${this.table}
                WHERE post_id = posts.post_id
            ),
            (
                SELECT count(replies) as replies_no
            )
            FROM ( SELECT DISTINCT post_id FROM ${this.table} ) posts
            INNER JOIN ${this.table} comments ON comments.post_id = posts.post_id
            FULL JOIN replies ON comments.id = replies.comment_id
            GROUP BY posts.post_id
            ORDER BY date DESC
        `
        return this.db.query(queryString)
    }

    /**
     * Select by post id
     */
    async selectByPostId(postId) {
        const queryString = `
            SELECT id, date, display_name, text
            FROM ${this.table} 
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
            RETURNING id, email;
        `
        const params = [this.id, displayName, email, postId, postSlug, text]
        return this.db.query(queryString, params)
    }

    /**
     * Check if a comment exists
     */
    async checkById(id) {
        const queryString = `
            SELECT * FROM ${this.table} WHERE id = $1;
        `
        const params = [id]
        return this.db.query(queryString, params)
    }

    /**
     * Check if a comment is verified
     */
    async checkByCol(id, col, value) {
        const queryString = `
            SELECT * FROM ${this.table} WHERE id = $1 AND ${col} = ${value};
        `
        const params = [id]
        return this.db.query(queryString, params)
    }

    /**
     * Verify comment
     */
    async verify(id) {
        const queryString = `
            UPDATE ${this.table} 
            SET verified = TRUE 
            WHERE id = $1
            RETURNING id, post_slug, verified;
        `
        const params = [id]
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
            RETURNING id, post_slug, email, approved;
        `
        const params = [id]
        return this.db.query(queryString, params)
    }

    /**
     * Delete comment
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

module.exports = CommentsModel