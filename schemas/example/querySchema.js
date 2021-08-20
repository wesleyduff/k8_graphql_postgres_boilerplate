
const typeDef = `
    type Query{
        sessions:[Session],
        getStarWarsPerson(id:ID!):starWarsPeople,
        getStarWarsPlanet(id:ID!):starWarsPlanet
        getWeatherDaily(zoneID:String!, zipcode:String!):weatherDaily
    }
`

module.exports = typeDef;