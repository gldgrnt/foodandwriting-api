/**
 * Helper script to create db tables
 * for testing puposes
 */
const db = require('../db')
const { isProduction } = require('../config')

/**
 * Create comments table
 */
const createCommentsTable = () => {
    if (isProduction) return

    const queryString = `
        CREATE TABLE IF NOT EXISTS comments (
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            date TIMESTAMPTZ DEFAULT now(),
            display_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            post_id VARCHAR(255) NOT NULL,
            post_slug VARCHAR(255) NOT NULL,
            text VARCHAR(255) NOT NULL,
            verified BOOLEAN DEFAULT FALSE,
            approved BOOLEAN DEFAULT FALSE
        );
    `
    console.log('Creating `comments` table')
    return db.query(queryString)
}

/**
 * Create replies table
 */
const createRepliesTable = () => {
    if (isProduction) return

    const queryString = `
        CREATE TABLE IF NOT EXISTS replies (
            id VARCHAR(255) PRIMARY KEY NOT NULL,
            date TIMESTAMPTZ DEFAULT now(),
            text VARCHAR(255) NOT NULL,
            comment_id VARCHAR(11) NOT NULL REFERENCES comments(id) ON DELETE CASCADE
        );
    `
    console.log('Creating `replies` table')
    return db.query(queryString)
}

/**
 * Create all tables
 */
(async () => {
    try {
        await createCommentsTable()
        await createRepliesTable()
    } catch (err) {
        throw err
    }

    // Exit
    console.log('Tables created')
    process.exit()
})()
