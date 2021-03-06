import ApolloDataSource from 'apollo-datasource';
import ERRORS from '../../errors/index.js';
import util from 'util';

class PostgresqlDataSource extends ApolloDataSource.DataSource {
    constructor(store){
        // Always call super()
        super();
        this.store = store;
    }

    /**
     * This is a function that gets called by ApolloServer when being setup.
     * This function gets called with the datasource config including things
     * like caches and context. We'll assign this.context to the request context
     * here, so we can know about the user making requests
     */
    initialize(config) {
        this.context = config.context;
    }

    /**
     * User can be called with an argument that includes email, but it doesn't
     * have to be. If the user is already on the context, it will use that user
     * instead
     */
    async seedDatabase(args = {}) {
        const seed = await this.store.seed();
        return "success"
    }

    async getUsers(){
        const usersList = await this.store.getUsers();
        return usersList;
    }

    async findOrCreateUser({user}){
        const response = await this.store.findOrCreateUser(user);
        return response;
    }
}

export default PostgresqlDataSource;