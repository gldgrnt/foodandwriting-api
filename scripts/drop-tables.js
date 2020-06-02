const db = require('../db')
const { isProduction } = require('../config')

/**
 * Drop tables query
 */
const dropTablesQuery = `
    DROP TABLE IF EXISTS comments CASCADE;
    DROP TABLE IF EXISTS replies;
`;


/**
 * Drop all tables
 */
(async () => {
    try {
        if (isProduction) return

        console.log('Dropping tables')
        await db.query(dropTablesQuery)
        console.log('Tables dropped')
        process.exit()
    } catch (err) {
        throw err
    }
})()