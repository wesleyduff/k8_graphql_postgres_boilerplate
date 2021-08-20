const
    { RESTDataSource } = require('apollo-datasource-rest'),
    {
        StarWarsCustomError
    } = require('../../errors'),
    starWars = require('../../MOCKS/data/starWars.json')
;

class StarWarsApi extends  RESTDataSource {
    constructor(){
        // Always call super()
        super();
        // Sets the base URL for the REST API
        this.baseURL = 'https://swapi.dev/api/';
    }

    async getPlanet(id) {
        throw new StarWarsCustomError('ERROR : INFO : STARWARS : test throw validation', 'SessionAPI -> getPlanet', {log : {level: 'debug'}})
        //return this.get(`planets/${id}`); //comment out so we do not hit api
        return starWars.planets;
    }

    async getCharacter(id) {
        //return this.get(`people/${id}`); //comment out so we do not hit api
        return starWars.people;
    }
}

module.exports = StarWarsApi;