
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
            host: 'localhost',
            user: 'database-user',
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        })
    }

    async createStore(){
        try {
            return await this.connectAndReturnClient();
        } catch(exception){
            throw Error(`Could not connect to DB`)
        }
    }

    async connectAndReturnClient(){
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
                    return resolve(this.client)

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

    async seed(){

        try {
            await this.connectAndReturnClient(); //sets client on this

            const res = await this.client.query('SELECT $1::text as message', ['Hello world!'])
            console.log(res.rows[0].message) // Hello world!

            //close connection
            await this.closeConnection();

            return res;
        } catch(exception){
            console.log(`ERROR : ALERT : Could not seed the database.`)
        }
    }

    async closeConnection(){
        try {
            await this.client.release(true)
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