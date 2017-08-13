let dockerConfig = require('./config.js').dockerConfig,
    rp = require('request-promise'),
    _ = require('lodash');

let getAuthToken = (username, password) => {

    let options = {
        method: 'POST',
        uri: `${dockerConfig.loginEndpoint}`,
        body: {
            "username": `${username}`,
            "password": `${password}`
        },
        json: true
    }
    return rp(options)
},
    getImageTags = (username, repository, authtoken) => {
        let options = {
            method: 'GET',
            uri: `${dockerConfig.repositoryEndPoint}/${username}/${repository}/tags`,
            headers: {
                Authorization: `Bearer ${authtoken}`
            },
            json: true
        }
        return rp(options);
    }

module.exports = {getAuthToken,getImageTags}