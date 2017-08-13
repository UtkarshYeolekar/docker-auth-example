let config = require('./api/config.js').dockerConfig,
    dockerApi = require('./api/dockerHubApi.js'),
    _ = require('lodash'),
    R = require('ramda');

console.info("Initialize Username,Password & Repository in the Config file With Your Docker Account Before Debugging");

dockerApi.getAuthToken(config.username, config.password)
    .then((tokenInfo) => {
        console.log("token recieved");
        return dockerApi.getImageTags(config.username, config.repository, tokenInfo.token)
    })
    .then((tags) => {
        if (!_.isUndefined(tags) && !_.isNull(tags) && tags.count > 0) {
            let result = tags.results.map((tag) => (R.pick(["name"], tag)));
            console.log(result);
        }
        else
            console.log("No tags found");
    })
    .catch((err) => {
        console.error("Error Occured ", err.message);
    });