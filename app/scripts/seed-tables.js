/**
 * Helper to seed dev db tables
 */
const db = require('../db')
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Seed comments table
 */
const seedComments = () => {
    if (isProduction) return

    const queryString = `
        INSERT INTO comments 
            (display_name, post_id, post_slug, parent_comment_id, text)
        VALUES
            ('First commenter', '1', '/post-1', 0, 'This is the first comment'),
            ('First replier', 1, '/post-1', 1, 'This is a reply to the first comment'),
            ('Second commenter', '1', '/post-1', 0, 'This is the second comment'),
            ('Another commenter', 2, '/post-2', 0, 'This is a comment on another post');
    `

    console.log('Seeding `comments` table')
    return db.query(queryString)
}

/**
 * Seed all tables
 */
(async () => {
    try {
        await seedComments()

    } catch (err) {
        throw err
    }

    // Exit
    console.log('Tables seeded')
    process.exit()
})()