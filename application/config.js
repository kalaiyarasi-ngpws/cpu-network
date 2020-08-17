const pg = require('pg');
const dotenv = require('dotenv');
const result = dotenv.config();

const psqlObj = {
    host: process.env.HOST,
    port: process.env.PSQL_PORT,
    database: process.env.PSQL_DATABASE,
    user: process.env.PSQL_USER,
    password: process.env.PSQL_PASSWORD,
};

const BCPromiseQuery = (text,values) => {
    const psqlConn = new pg.Pool(psqlObj);
    // console.log(psqlConn);
    return new Promise((resolve, reject) => {
        try {
            psqlConn.connect((err, client, done) => {
                if (err) reject(err);
                client.query(text, values, (error, result) =>  {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                    done();
                });
            });
        } catch (e) {
            console.log('catch error ', e);
        }
    });

}
module.exports.BCPromiseQuery = BCPromiseQuery;
