const db = require('../db')

class CommentsModel {
    constructor() {
        this.db = db
        this.table = 'comments'
    }

    /**
     * Select all comments
     */
    async selectAll() {
        const queryString = `SELECT * FROM ${this.table} ORDER BY date DESC`
        return this.db.query(queryString)
    }

    /**
     * Select by post id
     */
    async selectByPostId(postId) {
        const queryString = `SELECT * FROM ${this.table} WHERE post_id = $1 ORDER BY date DESC`
        const params = [postId]
        return this.db.query(queryString, params)
    }
}

module.exports = CommentsModel