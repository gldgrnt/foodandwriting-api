const { checkSchema } = require('express-validator')

module.exports = checkSchema({
    postId: {
        in: ['params'],
        errorMessage: 'Post ID is wrong'
    }

    // TODO: Add schema validation
})