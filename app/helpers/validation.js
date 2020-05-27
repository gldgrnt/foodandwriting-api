// Validation helper functions
const { validationResult } = require('express-validator')

/**
 * Check errors from validation middleware
 * @param {Object} req Http request object
 * @returns {{hasErrors: boolean, errors: object}}
 */
const checkErrors = (req) => {
    const result = validationResult(req)
    const errors = result.errors.map(err => err.msg) || []

    return {
        hasErrors: !result.isEmpty(),
        errors: errors
    }
}

module.exports = {
    checkErrors
}

