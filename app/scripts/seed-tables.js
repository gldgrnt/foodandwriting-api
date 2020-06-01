/**
 * Helper to seed dev db tables
 */
const db = require('../db')
const { nanoid } = require('nanoid')
const { isProduction } = require('../config')

/**
 * Seed table 
 */
const seedTable = ({ name, queryString }) => {
    if (isProduction) return

    console.log(`Seeding '${name}' table`)
    return db.query(queryString)
}

/**
 * Tables to seed
 */
const tablesToSeed = [
    {
        name: 'comments',
        queryString: `
            INSERT INTO comments 
                (id, display_name, email, post_id, post_slug, text)
            VALUES
                ('${nanoid()}', 'First commenter', 'commenter@email.com', '1', '/post-1', 'This is the first comment');
        `
    }
];

/**
 * Seed all tables
 */
(() => {
    tablesToSeed.forEach(async table => {
        try {
            await seedTable(table)
        } catch (err) {
            throw err
        }
    })

    // Exit
    console.log('Tables seeded')
    process.exit()
})()