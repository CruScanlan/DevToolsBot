let mysqlModule = require('mysql');

module.exports = {
    /**
     * Start the mysql connection pool
     * @returns {Pool|Error}
     */
    start(options) {
        if(module.exports._started) return new Error("MYSQL has already been started");
        module.exports.pool = mysqlModule.createPool(options);
        module.exports._started = true;
        return module.exports.pool;
    },

    /**
     * Querys mysql
     * @param {string} sql - SQL code containing no variable data
     * @param {array} inserts - All variable data to be inserted into query
     * @returns {Promise<rows, fields, sqlString>|Promise<Error>}
     */
    query: async (sql, inserts) => {
        return new Promise((resolve, reject) => {
            //Check types
            if(!sql) return reject("sql string missing");
            if(!inserts) return reject("inserts array missing");
            if(typeof sql !== "string") return reject("sql is not of type string, instead type:"+typeof sql);
            if(typeof inserts !== "object" || !Array.isArray(inserts)) return reject("inserts is not of type object(array), instead type:"+typeof inserts);

            let sqlString = mysqlModule.format(sql, inserts); //Format prepared statments

            module.exports.pool.getConnection((err, sqlConnection) => { //get a connection from the pool
                if(err) return reject(`Error when getting connection from mysql pool | ${err.message}`);
                sqlConnection.query(sqlString, (err, rows, fields) => { //use connection to query mysql
                    sqlConnection.release(); //release the connection back to the pool
                    if(err) return reject(`Error when executing MSYQL query: ${sqlString} | ${err.message}`);
                    return resolve({rows, fields, sqlString});
                });
            })
        });
    },

    /**
     * Closes all connections in the pool
     * @returns {Promise<Error>|Promise<void>}
     */
    closeAll: async() => {
        return new Promise((resolve, reject) => {
            module.exports.pool.end((err) => {
                if (err) return reject(new Error("Error when closing all mysql connections | " + err.message));
                return resolve();
            })
        })
    },

    /**
     * MYSQL database pool
     * @type {Pool}
     */
    pool: null,

    /**
     * Has mysql been started
     * @type {boolean}
     * @private
     */
    _started: false
};