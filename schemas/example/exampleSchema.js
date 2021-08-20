import
    {
        gql
    } from 'apollo-server'
;

export const typeDef = gql`
    type Query{
        sessions:[Session]
    }

    type Session {
        id: ID!
        title: String!
        description: String
        startsAt: String
        endsAt: String
        room: String
        day: String
        format: String
        track: String
        @deprecated(
            reason: "Too many sessions do not fit into a single track, we will be migrating to a tags based system in the future..."
        )
        level: String
    }
`