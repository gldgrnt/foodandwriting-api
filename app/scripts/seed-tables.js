/**
 * Helper to seed dev db tables
 */
const db = require('../db')
const { nanoid } = require('nanoid')
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Seed comments table
 */
const seedComments = () => {
    if (isProduction) return

    const queryString = `
        INSERT INTO comments 
            (id, display_name, email, post_id, post_slug, text)
        VALUES
            ('${nanoid()}', 'First commenter', 'commenter@email.com', '1', '/post-1', 'This is the first comment');
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