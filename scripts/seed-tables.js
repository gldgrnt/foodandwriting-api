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
        ('${exampleId}', 'First commenter', 'commenter@email.com', '0ed39902-72ef-4409-9e30-9db4e8701c4c', '/recipes/turnip-potato-and-mustard-crumble', 'This is a comment'),
        ('${nanoid()}', 'Second commenter', 'commenter@email.com', '0ed39902-72ef-4409-9e30-9db4e8701c4c', '/recipes/turnip-potato-and-mustard-crumble', 'This is another comment'),
        ('${nanoid()}', 'Another commenter', 'commenter@email.com', '343cc865-f6d8-4c9e-9eae-45d9fe29e182', '/recipes/larb-thai-pork-salad-in-cabbage-cups', 'This is another comment');

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