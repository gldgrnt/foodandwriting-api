const comments = require('./comments')
const replies = require('./replies')

// Export function to mount routes onto app
module.exports = app => {
    app.use('/comments', comments)
    app.use('/replies', replies)
}