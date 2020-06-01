/**
 * Helper script to create and drop db tables
 * for testing puposes
 */
const db = require('../db')
const isProduction = process.env.NODE_ENV === 'production'

/**
 * Drop table
 */
const dropTable = (tableName) => {
    if (isProduction) return

    const queryString = `DROP TABLE IF EXISTS ${tableName}`

    console.log(`Dropping '${tableName}' table`)
    return db.query(queryString)

}

/**
 * Tables to drop
 */
const tabelsToDrop = ['replies', 'comments'];

/**
 * Drop all tables
 */
(async () => {
    try {
        tabelsToDrop.forEach(async table => {
            await dropTable(table)
        })
    } catch (err) {
        throw err
    }

    // Exit
    console.log('Tables dropped')
    process.exit()
})()