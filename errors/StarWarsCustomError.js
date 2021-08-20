import { ApolloError } from 'apollo-server';
import CONSTANTS from '../CONSTANTS';

module.exports = class StarWarsCustomError extends ApolloError {
    constructor(message, caller = null, extensions) {
        super(message, CONSTANTS.ERRORS.STARWARS_CUSTOM_ERROR, extensions);
        this.caller = caller;

        Object.defineProperty(this, 'name', { value: CONSTANTS.ERRORS.STARWARS_CUSTOM_ERROR });
    }

}