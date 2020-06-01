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

    console.log(`Dropping '${tableName}' table`)
    return db.query(`DROP TABLE IF EXISTS ${tableName}`)

}

/**
 * Tables to drop
 */
const tablesToDrop = ['replies', 'comments'];

/**
 * Drop all tables
 */
(() => {
    tablesToDrop.forEach(async table => {
        try {
            await dropTable(table)
        } catch (err) {
            throw err
        }
    })

    // Exit
    console.log('Tables dropped')
    process.exit()
})()