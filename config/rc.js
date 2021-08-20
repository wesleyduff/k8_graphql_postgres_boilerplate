const {
    mongo_url
} = require('./mongo_url');

module.exports = {
    service: 'transit',
    env: 'rc',
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