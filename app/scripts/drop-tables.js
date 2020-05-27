/**
 * Helper script to create and drop db tables
 * for testing puposes
 */
const db = require('../db')
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Drop comments table
 */
const dropCommentsTable = () => {
    if (isProduction) return

    const queryString = `DROP TABLE IF EXISTS comments`

    console.log('Dropping `comments` table')
    return db.query(queryString)

}

/**
 * Drop all tables
 */
(async () => {
    try {
        await dropCommentsTable()

    } catch (err) {
        throw err
    }

    // Exit
    console.log('Tables dropped')
    process.exit()
})()