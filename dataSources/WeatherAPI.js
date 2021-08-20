
const
    { RESTDataSource } = require('apollo-datasource-rest'),
    {
        ValidationError
    } = require('../errors')
;

class WeatherAPI extends RESTDataSource {
    constructor(){
        //https://dev.raven.spectrumtoolbox.com/weather/daily/54e4ffc9ceafc43649b4dae9/en?zipcode=80104
        // Always call super()
        super();
        // Sets the base URL for the REST API
        this.baseURL = 'https://dev.raven.spectrumtoolbox.com/';
    }

    async getWeatherDaily(zoneID, zipCode) {
        return this.get(`weather/daily/${zoneID}/en?zipcode=${zipCode}`); //comment out so we do not hit api
    }

}

module.exports = WeatherAPI;