
const typeDef = `
    scalar JSON
    scalar Date
    scalar Timestamp
    scalar TimestampTz
    
    type User @cacheControl(maxAge: 240, scope: 'PUBLIC') {
        id: ID!
        email: String!
        data: JSON
        date_col: Date!
        timestamp_col: Timestamp!
        timestamptz_col: TimestampTz!
    }
    
    input UserInput {
        email: String!
        data: JSON
        date_col: Date
        timestamp_col: Timestamp
        timestamptz_col: TimestampTz
    }
`

export default typeDef;