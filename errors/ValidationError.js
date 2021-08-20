import { ApolloError } from 'apollo-server';
import CONSTANTS from '../CONSTANTS';


module.exports = class ValidationError extends ApolloError {
    constructor(message, caller = null, extensions) {
        super(message, CONSTANTS.ERRORS.VALIDATION_ERROR, extensions);
        this.caller = caller;

        Object.defineProperty(this, 'name', { value: CONSTANTS.ERRORS.VALIDATION_ERROR });
    }

}