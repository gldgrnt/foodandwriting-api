const config = require('../config')
const { Pool } = require('pg')

// Create a pool connection to the database
const pool = new Pool({
    connectionString: config.db.url
})

/**
 * DB Query
 * @param {String} queryString Postgres query string
 * @param {Array=} params Query string parameters
 * @returns {Promise} Promise of database data
 */
exports.query = (queryString, params = []) => {
    try {
        return pool.query(queryString, params)
    } catch (err) {
        throw err
    }
}