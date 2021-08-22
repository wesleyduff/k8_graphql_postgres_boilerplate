
const typeDef = `
    type Query{
        getStarWarsPerson(id:ID!):starWarsPeople,
        getStarWarsPlanet(id:ID!):starWarsPlanet,
        seedDatabase:String
    }
`

export default typeDef;