const clipboardy = require('clipboardy')
const axios = require('axios')
const { clientId, domain, clientSecret } = require('../config').okta

// Axios config
const axiosConfig = {
    method: 'post',
    url: `https://${domain}/oauth2/default/v1/token`,
    auth: {
        username: clientId,
        password: clientSecret
    },
    data: "grant_type=client_credentials&scope=customScope",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
};

// Do request
(async () => {
    console.log('Fetching Okta access token')

    try {
        const { data } = await axios(axiosConfig)
        console.log('Copying token to clipboard')

        clipboardy.writeSync(data.access_token)
        console.log('Token copied to clipboad!')
    } catch (err) {
        console.log(err)
    }
})()
