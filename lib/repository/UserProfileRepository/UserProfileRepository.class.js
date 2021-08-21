import PostgreSqlConnectionService from '../../services/PostgreSQL/Connect.js'

export default class UserProfileRepository {

    constructor(dbConnection = null){
        this.dbConnection = dbConnection;
    }

    setDbConnection(){
        if(!this.dbConnection){
            //setup connection
            const postgreSqlConnectionService = new PostgreSqlConnectionService().connect()
        }

        return false;
    }
}