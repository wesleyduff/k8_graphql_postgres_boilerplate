import sessions from '../../MOCKS/data/sessions.json'
import { DataSource } from 'apollo-datasource'
;

class SessionAPI extends  DataSource {
    constructor(){
        super();
    }

    getSessions(){
        return sessions
    }
}

module.exports = SessionAPI;