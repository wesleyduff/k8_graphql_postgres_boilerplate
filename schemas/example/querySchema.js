
const typeDef = `
    type Query{
        getStarWarsPerson(id:ID!):starWarsPeople,
        getStarWarsPlanet(id:ID!):starWarsPlanet,
        seedDatabase:String,
        getUsers:[User]
    }
`

export default typeDef;