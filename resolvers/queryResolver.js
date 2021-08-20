export default {
    Query: {
        sessions: (parent, args, { dataSources }, info) => {
            return dataSources.sessionAPI.getSessions(args)
        },
        getStarWarsPerson:  (parent, {id}, { dataSources }, info) => {
            return dataSources.starWarsAPI.getCharacter(id);
        },
        getStarWarsPlanet:  (parent, {id}, { dataSources }, info) => {
            return dataSources.starWarsAPI.getPlanet(id);
        },
        getWeatherDaily: (parent, {zoneID, zipcode}, { dataSources }, info ) => {

            return dataSources.weatherAPI.getWeatherDaily(zoneID, zipcode);
        }
    },
    weatherDaily : {
        days: (parent, ars, {dataSources}, info) => {
            return parent.result.days
        }
    }
}