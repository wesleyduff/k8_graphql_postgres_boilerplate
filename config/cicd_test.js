const vault = JSON.parse(require( '/secrets/vault.json' ));

/**
 * CI/CD : Config
*/
module.exports = {
    service: 'Transit API',
    env: 'test', //needs to be test for mongo memory server not ci/cd
    mongo: {
        options: {
            useUnifiedTopology:true
        },
        url:"mongodb://127.0.0.1:27017/RavenData",
    },
    endpoints: {
    }
}