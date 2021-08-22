
export default {
    Mutation: {
        findOrCreateUser: ( parent, args, {dataSources}, info) => {
            return dataSources.postgrSqlAPI.findOrCreateUser(args);
        }
    }
}