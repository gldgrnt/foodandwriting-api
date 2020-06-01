/**
 * Helper script to create db tables
 * for testing puposes
 */
const db = require('../db')
const { isProduction } = require('../config')

/**
 * Create tables query string
 */
const createTablesQuery = `
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

    CREATE TABLE IF NOT EXISTS replies (
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        date TIMESTAMPTZ DEFAULT now(),
        text VARCHAR(255) NOT NULL,
        comment_id VARCHAR(255) NOT NULL REFERENCES comments(id) ON DELETE CASCADE
    );
`;

/**
 * Create all tables
 */
(async () => {
    try {
        if (isProduction) return

        console.log('Creating tables')
        await db.query(createTablesQuery)
        console.log('Tables created')
        process.exit()
    } catch (err) {
        throw err
    }
})()
