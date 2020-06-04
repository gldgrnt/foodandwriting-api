const { urls } = require('../config')

/**
 * Populate pug template with useful vars
 */
exports.addPugLocals = (extraLocals = {}) => {
    return {
        ...extraLocals,
        appUrl: urls.app,
        siteUrl: urls.site,
        studioUrl: urls.studio,
    }
}