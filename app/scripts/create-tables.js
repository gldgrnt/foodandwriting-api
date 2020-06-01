/**
 * Helper script to create db tables
 * for testing puposes
 */
const db = require('../db')
const { isProduction } = require('../config')

/**
 * Create comments table
 */
const createTable = ({ name, queryString }) => {
    if (isProduction) return

    console.log(`Creating '${name}' table`)
    return db.query(queryString)
}


/**
 * Tables to create
 */
const tablesToCreate = [
    {
        name: 'replies',
        queryString: `
            CREATE TABLE IF NOT EXISTS replies (
                id VARCHAR(255) PRIMARY KEY NOT NULL,
                date TIMESTAMPTZ DEFAULT now(),
                text VARCHAR(255) NOT NULL,
                comment_id VARCHAR(11) NOT NULL REFERENCES comments(id) ON DELETE CASCADE
            );
        `
    }, {
        name: 'comments',
        queryString: `
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
    }
];

/**
 * Create all tables
 */
(() => {
    tablesToCreate.forEach(async table => {
        try {
            await createTable(table)
        } catch (err) {
            throw err
        }
    })

    // Exit
    console.log('Tables created')
    process.exit()
})()
