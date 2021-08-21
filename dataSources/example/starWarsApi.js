import { RESTDataSource } from 'apollo-datasource-rest';
import ERRORS from '../../errors/index.js';
import fs from 'fs';
import path from 'path'

class StarWarsApi extends  RESTDataSource {
    constructor(){
        // Always call super()
        super();
        // Sets the base URL for the REST API
        this.baseURL = 'https://swapi.dev/api/';
    }

    async getPlanet(id) {
        throw new ERRORS.StarWarsCustomError('ERROR : INFO : STARWARS : test throw validation', 'SessionAPI -> getPlanet', {log : {level: 'debug'}})
        return this.get(`planets/${id}`); //comment out so we do not hit api

    }

    async getCharacter(id) {
        return this.get(`people/${id}`); //comment out so we do not hit api
    }
}

export default StarWarsApi;