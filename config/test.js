module.exports = {
    service: 'transit',
    env: 'test',
    mongo: {
        options: {
            useUnifiedTopology:true
        },
        url:"mongodb://127.0.0.1:27017/RavenData",
    },
    endpoints: {
    }
}