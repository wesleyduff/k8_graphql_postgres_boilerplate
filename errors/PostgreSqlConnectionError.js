import CONSTANTS from '../CONSTANTS/index.js';

export default class PostgreSqlConnectionError extends Error {
    constructor(message, caller = null, extensions) {
        super(message);
        this.caller = caller;
        this.extensions = extensions;

        Object.defineProperty(this, 'name', { value: CONSTANTS.ERRORS.POSTGRESSQL_CONNECTION_ERROR });
    }

}