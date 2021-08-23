/**
 * custom scalar types
 */
import customScalarTypes from '../schemas/custom_scalar_types.js'

export default {
    Date: customScalarTypes.dateScalar,
    Timestamp: customScalarTypes.timestampScalar,
    TimestampTz: customScalarTypes.timestampTzScalar,
    Query: {
        getStarWarsPerson:  (parent, {id}, { dataSources }, info) => {
            return dataSources.starWarsAPI.getCharacter(id);
        },
        getStarWarsPlanet:  (parent, {id}, { dataSources }, info) => {
            return dataSources.starWarsAPI.getPlanet(id);
        },
        seedDatabase:  (parent, args, { dataSources }, info) => {
            return dataSources.postgrSqlAPI.seedDatabase();
        },
        getUsers: (parent, args, { dataSources }, info) => {
            //overrides any cache set on schemas : FYI
            info.cacheControl.setCacheHint({ maxAge: 60, scope: 'PUBLIC' });
            return dataSources.postgrSqlAPI.getUsers();
        }
    }
}