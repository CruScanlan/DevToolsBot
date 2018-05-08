const cote = require('cote');
const Collection = require('map-collection');
let mysql = require('./mysql');

class CoteServiceRegistry {
    constructor(mysqlOptions) {
        if(!mysqlOptions) throw new Error(`mysqlOpions was not defined`);
        if(typeof mysqlOptions !== 'object') throw new TypeError(`mysqlOptions was not of type string`);

        /**
         * The mysql client for the registry
         */
        Object.defineProperty(this, 'mysql', {value: mysql});

        /**
         * The cote responder for the db
         */
        this.responder = new cote.Responder({name: 'db-service', key: 'db'}, {log: false});

        /**
         * Start mysql
         */
        this.mysql.start(mysqlOptions);

        /**
         * Has the endpoints already been registered?
         * @type {boolean}
         */
        this.registered = false;
    }

    registerEndpoints(endpoints) {
        if(this.registered) throw new Error(`endpoints have already been registered`);
        if(!endpoints) throw new Error(`endpoints was not defined`);
        if(!Array.isArray(endpoints)) throw new TypeError(`endpoints was not of type array`);
        for(let i=0; i < endpoints.length; i++) {
            this._registerEndpoint(endpoints[i]);
        }
        this.registered = true;
    }

    _registerEndpoint(endpoint) {
        this.validateEndpoint(endpoint);
        this.responder.on(endpoint.name, async (req, res) => {
            let {sql, inserts} = endpoint.queryConstructor(req.queryParams || null);
            let dbRes;
            try {
                dbRes = await mysql.query(sql, inserts);
            } catch(e) {
                res({success: false});
                throw new Error(e);
            }
            if(endpoint.doesReturn) return res({success: true, rows: dbRes.rows, fields: dbRes.fields, sqlString: dbRes.sqlString});
            res({success: true});
        })
    }

    validateEndpoint(endpoint) {
        if(!endpoint) throw new Error(`endpoint was not defined`);
        if(typeof endpoint !== 'object') throw new TypeError(`endpoint was not of type object`);
        if(!endpoint.name) throw new Error(`endpoint.name was not defined`);
        if(typeof endpoint.name !== 'string') throw new TypeError(`endpoint.name was not of type string`);
        if(endpoint.doesReturn === undefined) throw new Error(`endpoint.doesReturn was not defined`);
        if(typeof endpoint.doesReturn !== 'boolean') throw new TypeError(`endpoint.doesReturn was not of type boolean`);
        if(!endpoint.queryConstructor) throw new Error(`endpoint.queryConstructor was not defined`);
        if(typeof endpoint.queryConstructor !== 'function') throw new TypeError(`endpoint.constructor was not of type function`);
    }
}

module.exports = CoteServiceRegistry;