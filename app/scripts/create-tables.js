/**
 * Helper script to create db tables
 * for testing puposes
 */
const db = require('../db')
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Create comments table
 */
const createCommentsTable = () => {
    if (isProduction) return

    const queryString = `
        CREATE TABLE IF NOT EXISTS comments (
            ID SERIAL PRIMARY KEY,
            date TIMESTAMPTZ DEFAULT now(),
            display_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            post_id VARCHAR(255) NOT NULL,
            post_slug VARCHAR(255) NOT NULL,
            parent_comment_id INTEGER DEFAULT 0,
            text VARCHAR(255) NOT NULL,
            verified BOOLEAN DEFAULT FALSE,
            approved BOOLEAN DEFAULT FALSE
        );
    `
    console.log('Creating `comments` table')
    return db.query(queryString)
}

/**
 * Create all tables
 */
(async () => {
    try {
        await createCommentsTable()

    } catch (err) {
        throw err
    }

    // Exit
    console.log('Tables created')
    process.exit()
})()
