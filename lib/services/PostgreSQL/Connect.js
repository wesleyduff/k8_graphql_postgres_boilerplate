
import pg from 'pg';
import ERRORS from '../../../errors/index.js';
import CONSTANTS from '../../../CONSTANTS/index.js';
import util from 'util';
import config from '../../../config/index.js'

export default class PostgreSqlConnection {
    constructor(){
        this.client = null;
    }

    setPool(){
        const Pool = pg.Pool;
        this.pool = new Pool({
            user: 'postgres',
            host: config.postgres.url,
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


                    console.log(`DEBUGGING ---> Connected to postgre`)
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

    async findOrCreateUser({email, data}){
        console.log(`DEBUGGING ---> FINDING USERS`)
        await this.connectAndReturnClient(); //sets client on this

        const insertQuery = `
          WITH cte AS (
            INSERT INTO users(email, date_col, timestamp_col, timestamptz_col, data) 
            VALUES ($1, $2, $3, $4, $5) 
            ON CONFLICT (email) DO NOTHING
            RETURNING email
          )
          SELECT *
          FROM users
          WHERE email = $1
        `,
            findQuery = `
             SELECT * FROM users 
             WHERE email = $1
            `
        
        // create a new user
        const now = new Date();
        const userJSON = JSON.parse(data);
        const result = await this.client.query(insertQuery, [email, now, now, now, userJSON]);



        if(result.rowCount > 0){ //found user
            return result.rows[0]
        }

        const createdUser =  await this.client.query(findQuery, [email]);

        await this.closeConnection();

        return createdUser.rows[0]

    }

    async getUsers(){
        console.log(`DEBUGGING ---> Getting all users`)
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

                CREATE TABLE users(
                  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                  email TEXT UNIQUE,
                  data JSONB,
                  date_col DATE,
                  timestamp_col TIMESTAMP,
                  timestamptz_col TIMESTAMPTZ,
                  CONSTRAINT email UNIQUE (email)
                );
                 `

            //craete table
           const insert = await this.client.query(createTableText);

            const newUser = { email: 'wesley.duff@charter.com' }
            const insertText = 'INSERT INTO users(email, date_col, timestamp_col, timestamptz_col, data) VALUES ($1, $2, $3, $4, $5)'
            const now = new Date()
            // create a new user
            await this.client.query(insertText, ['fake@fake.com', now, now, now, newUser]);

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