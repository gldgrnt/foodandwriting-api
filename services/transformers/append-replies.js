/**
 * Join replies to comments
 * @param {Object} comments Object from comments table
 * @param {Object} replies Object from replies table
 * @returns {Array} Comments with appended replies
 */
module.exports = (comments, replies) => {
    // Loop through replies and join them to comment
    return comments.rows.map(comment => {
        comment.replies = [...replies.rows.filter(reply => reply.comment_id === comment.id)]
        return comment
    })
}

