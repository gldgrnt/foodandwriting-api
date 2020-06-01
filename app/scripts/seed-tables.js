/**
 * Helper to seed dev db tables
 */
const db = require('../db')
const { nanoid } = require('nanoid')
const { isProduction } = require('../config')

// Create an id for comments and replies entry
const exampleId = nanoid()

/**
 * Seed tables query
 */
const seedTablesQuery = `
    INSERT INTO comments
        (id, display_name, email, post_id, post_slug, text)
    VALUES
        ('${exampleId}', 'First commenter', 'commenter@email.com', '1', '/post-1', 'This is a comment'),
        ('${nanoid()}', 'Another commenter', 'commenter@email.com', '1', '/post-2', 'This is another comment');

    INSERT INTO replies
        (id, text, comment_id)
    VALUES
        ('${nanoid()}', 'Thanks for leaving a comment!', '${exampleId}');
`;

/**
 * Seed all tables
 */
(async () => {
    try {
        if (isProduction) return

        console.log('Seeding tables')
        await db.query(seedTablesQuery)
        console.log('Tables seeded')
        process.exit()
    } catch (err) {
        throw err
    }
})()