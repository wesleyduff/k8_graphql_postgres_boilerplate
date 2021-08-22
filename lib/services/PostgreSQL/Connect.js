
import pg from 'pg';
import ERRORS from '../../../errors/index.js';
import CONSTANTS from '../../../CONSTANTS/index.js';
import util from 'util';

export default class PostgreSqlConnection {
    constructor(){
        this.client = null;
    }

    setPool(){
        const Pool = pg.Pool;
        this.pool = new Pool({
            user: 'postgres',
            host: '127.0.0.1',
            database: 'demo_node',
            password: 'postgres',
            port: 5432,
        })
    }

    async createStore(){
        try {
            await this.connectAndReturnClient();
            return this;
        } catch(exception){
            throw Error(`Could not connect to DB`)
        }
    }

    async connectAndReturnClient(){
        var self = this;
        return new Promise((resolve, reject) => {
            try {
                if(this.client){
                   return resolve(this.client);
                }
                this.setPool();

                this.pool.connect((err, client, release) => {
                    if (err) {
                        console.log(`ERROR : could not connect : details => ${util.inspect(err)}`)
                        return reject(
                            new ERRORS.PostgreSqlConnectionError(
                                `ERROR : ALERT : Could not connect to postgreSQL`, 'Services -> PostgreSQL -> connect',
                                {
                                    log: {
                                        level: CONSTANTS.LOG_LEVELS.ALERT,
                                        message: 'ERROR : ALERT : Could not connect to postgreSQL',
                                        exception : err
                                    }
                                }
                            )
                        )
                    }

                    this.client = client;
                    return resolve(self)

                })
            } catch(exception){
                return reject(
                    new ERRORS.PostgreSqlConnectionError(
                        `ERROR : ALERT : Could not connect to postgreSQL`, 'Services -> PostgreSQL -> connect',
                        {
                            log: {
                                level: CONSTANTS.LOG_LEVELS.ALERT,
                                message: 'ERROR : ALERT : Could not connect to postgreSQL',
                                exception
                            }
                        }
                    )
                )
            }
        })
    }


    async getUsers(){
        await this.connectAndReturnClient(); //sets client on this
        const queryText = 'SELECT * FROM users'

        // create a new user
        const result = await this.client.query(queryText);

        await this.closeConnection();

        return result.rows;
    }

    async seed(){

        try {
            await this.connectAndReturnClient(); //sets client on this

            const createTableText = `
                CREATE EXTENSION IF NOT EXISTS "pgcrypto";

                CREATE TEMP TABLE users(
                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                  data JSONB,
                  date_col DATE,
                  timestamp_col TIMESTAMP,
                  timestamptz_col TIMESTAMPTZ
                );
                 `

            //craete table
           const insert = await this.client.query(createTableText);

            const newUser = { email: 'wesley.duff@charter.com' }
            const insertText = 'INSERT INTO users(date_col, timestamp_col, timestamptz_col, data) VALUES ($1, $2, $3, $4)'
            const now = new Date()
            // create a new user
            await this.client.query(insertText, [now, now, now, newUser]);

            await this.closeConnection();

            return 'done';


        } catch(exception){
            console.log(`ERROR : ALERT : Could not seed the database.`)
        }
    }

    async closeConnection(){
        try {
            await this.client.release(true);
            this.client = null;
        } catch(exception){
            throw new ERRORS.PostgreSqlCloseConnectionError(`ERROR : WARNING : Could not close PostgreSQL connection`, 'Services -> PostgreSQL -> closeConnection', {
                log : {
                    level: CONSTANTS.LOG_LEVELS.WARNING,
                    message: `ERROR : WARNING : connection to postgreSQL could not be closed`,
                    exception
                }
            })
        }
    }
}