import { ApolloServer, gql } from 'apollo-server'


/**
 * Type Definitions
 */
import sessionTypeDefs from './schemas/example/sessionSchema.js';
import queryTypeDefs from './schemas/example/querySchema.js';
import starWarsTypeDefs from './schemas/example/starWarsSchema.js';
import weatherTypeDefs from './schemas/weatherSchema.js';

const
    typeDefs = `${sessionTypeDefs} ${queryTypeDefs} ${starWarsTypeDefs} ${weatherTypeDefs}`
;




/**
 * Resolvers
 */
import resolvers from './resolvers/queryResolver.js'



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