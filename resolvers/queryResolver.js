export default {
    Query: {

        getStarWarsPerson:  (parent, {id}, { dataSources }, info) => {
            return dataSources.starWarsAPI.getCharacter(id);
        },
        getStarWarsPlanet:  (parent, {id}, { dataSources }, info) => {
            return dataSources.starWarsAPI.getPlanet(id);
        },
        seedDatabase:  (parent, args, { dataSources }, info) => {
            return dataSources.postgrSqlAPI.seedDatabase();
        }
    }
}