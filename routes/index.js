const comments = require('./comments')

// Export function to mount routes onto app
module.exports = app => {
    app.use('/comments', comments)
}