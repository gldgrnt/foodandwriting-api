require('dotenv').config()
const { Pool } = require('pg')

// Check if we're in a production environment
const isProduction = process.env.NODE_ENV === 'production'

// Create connection string - Heroku will give us this string via a env variable
const connectionString = isProduction
    ? process.env.DATABASE_URL
    : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
    connectionString,
    ssl: isProduction
})


module.exports = {
    query: (string, params) => pool.query(string, params),
}