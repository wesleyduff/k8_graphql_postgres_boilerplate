import { ApolloServer } from 'apollo-server';
import util from 'util';


/**
 * Type Definitions
 */
// import sessionTypeDefs from './schemas/example/sessionSchema.js';
import queryTypeDefs from './schemas/example/querySchema.js';
import starWarsTypeDefs from './schemas/example/starWarsSchema.js';
// import weatherTypeDefs from './schemas/weatherSchema.js';

const
   // typeDefs = `${sessionTypeDefs} ${queryTypeDefs} ${starWarsTypeDefs} ${weatherTypeDefs}`
    typeDefs = `${queryTypeDefs} ${starWarsTypeDefs}`
;

/**
 * Create Database Connection
 */
import PostgresqlDatabaseConnection from './lib/services/PostgreSQL/Connect.js';
const postgresqlDatabaseConnectionService = new PostgresqlDatabaseConnection();


let store = null;
try {
    store = postgresqlDatabaseConnectionService.createStore();
} catch(exception){
    process.kill(process.pid, 'SIGTERM');
}



/**
 * Resolvers
 */
import resolvers from './resolvers/queryResolver.js'

import StarWarsAPI from './dataSources/example/starWarsApi.js';
import PostgrSqlAPI from './dataSources/example/postgresql.datasource.js';



/**
 * Data Sources
 */

const dataSources = () => ({
    // sessionAPI: new (require('./dataSources/example/sessions'))(),
    starWarsAPI: new StarWarsAPI(),
    postgrSqlAPI: new PostgrSqlAPI({store})
    // weatherAPI: new (require('./dataSources/WeatherAPI'))()
})



const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
});


server
    .listen({
        port: process.env.PORT || 3000
    })
    .then(({url}) => {
        console.log(`INFO : SERVER NOTIFICATION : graph QL running at ${url}`)
    });



// Create a function to terminate your app gracefully:
function gracefulShutdown(e){
    console.log('INFO : DB is shutting down due to exit, SIGNINT, SIGTERM, or uncaughtException', util.inspect(e));
    process.exit(101);
}


// This will handle process.exit():
process.on('exit', async (code) => {
  await postgresqlDatabaseConnectionService.closeConnection();
});

// This will handle kill commands, such as CTRL+C:
process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

// This will prevent dirty exit on code-fault crashes:
process.on('uncaughtException', gracefulShutdown);