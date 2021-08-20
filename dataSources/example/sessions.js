const
    sessions = require('../../MOCKS/data/sessions.json'),
    { DataSource } = require('apollo-datasource')
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