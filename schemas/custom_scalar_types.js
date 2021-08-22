import graphql from 'graphql';
import moment from 'moment-timezone';

const
    { GraphQLScalarType, Kind } = graphql,
    timeZone = "America/Los_Angeles", //TODO: needs to go into config
    timestampFormat = 'YYYY-MM-DD HH:MM:SS.MS'
;

const jsonScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return value // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return value; // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return JSON.parse(ast.value)
        }
        return null; // Invalid hard-coded value (not an integer)
    }
});

/**
 * Timezone is default to merica/Los_Angeles
 */
const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
        return moment(value).format('YYYY-MM-DD') // Convert outgoing Date to integer for JSON
    },
    parseValue(value) {
        return moment(value).toDate(); // Convert incoming integer to Date
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return moment(parseInt(ast.value, 10)).toDate(); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    }
});


const timestampScalar = new GraphQLScalarType({
    name: 'timestamp',
    description: 'timestamp custom scalar type',
    serialize(value) {
        return moment(value).format(timestampFormat)
    },
    parseValue(value) {
        return moment(value).toDate();
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return moment(parseInt(ast.value, 10)).toDate(); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    }
});


const timestampTzScalar = new GraphQLScalarType({
    name: 'timestampTz',
    description: 'timestampTz custom scalar type',
    serialize(value) {
        return moment(value).tz(timeZone).format(timestampFormat)
    },
    parseValue(value) {
        return moment(value).tz(timeZone).toDate();
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return moment(parseInt(ast.value, 10)).tz(timeZone).toDate(); // Convert hard-coded AST string to integer and then to Date
        }
        return null; // Invalid hard-coded value (not an integer)
    }
});

export default {
    jsonScalar,
    dateScalar,
    timestampScalar,
    timestampTzScalar
}