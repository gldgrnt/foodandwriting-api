const { validationResult } = require('express-validator')

/**
 * Validation helper function to use on multiple routes
 * @description Runs each validator imperatively
 * @param {Array} validations Single or Array of route validations
 * @returns {Promise}
 */
const validate = validations => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        res.status(400).json({ errors: errors.array() })
    }
}

exports.validate = validate