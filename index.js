const
    { ApolloServer, gql } = require('apollo-server')
;


/**
 * Type Definitions
 */
const
    sessionTypeDefs = require('./schemas/example/sessionSchema'),
    queryTypeDefs = require('./schemas/example/querySchema'),
    starWarsTypeDefs = require('./schemas/example/starWarsSchema'),
    weatherTypeDefs = require('./schemas/weatherSchema'),
    typeDefs = `${sessionTypeDefs} ${queryTypeDefs} ${starWarsTypeDefs} ${weatherTypeDefs}`
;




/**
 * Resolvers
 */
const
    resolvers = require('./resolvers/queryResolver')



/**
 * Data Sources
 */

const dataSources = () => ({
    sessionAPI: new (require('./dataSources/example/sessions'))(),
    starWarsAPI: new (require('./dataSources/example/starWarsApi'))(),
    weatherAPI: new (require('./dataSources/WeatherAPI'))()
})



const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
});


server
    .listen({
        port: process.env.PORT || 3001
    })
    .then(({url}) => {
        console.log(`INFO : SERVER NOTIFICATION : graph QL running at ${url}`)
    });