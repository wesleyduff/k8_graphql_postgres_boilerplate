const {
    mongo_url
} = require('./mongo_url');

module.exports = {
    service: 'transit',
    env: 'prod',
    "mongo": {
        "url": mongo_url,
        "options": {
            "native_parser":true,
            "poolSize":5
        }
    },
    endpoints: {
    }
}