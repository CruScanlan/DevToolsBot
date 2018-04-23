const discord = require('discord.js');
let fs = require('fs');

class CommandRegistry {
    constructor(client) {

        /**
         * The client for the registry
         * @name CommandRegistry#client
         * @type {client}
         * @readonly
         */
        Object.defineProperty(this, 'client', {value : client});

        /**
         * Registered commands
         * @type {Collection<string, Command>}
         */
        this.commands = new discord.Collection();

        /**
         * Registered groups
         * @type {Collection<string, Command>}
         */
        this.commandGroups = new discord.Collection();

        /**
         * Resolved path to the bot's command directory
         * @type {?string}
         */
        this.commandsPath = null;
    }

    register(options) {
        if(typeof options !== 'object') throw new TypeError(`options must be an object`);
        if(!Array.isArray(options.groups)) throw new TypeError(`options.groups must be an array`);
        if(typeof options.commandsPath !== 'string') throw new TypeError(`options.commandsPath must be a string`);

        this._registerCommandPath(options.commandsPath);
        //this._registerCommandGroups(options.groups);

    }

    /**
     * Register the commands folder file path
     * @param path
     * @returns {path}
     * @private
     */
    _registerCommandPath(path) {
        if(!fs.existsSync(path)) throw new Error(`${path} | file path does not exist!`);
        this.commandsPath = path;
        return path;
    }

    _registerCommand(command) {

    }

    _registerCommandGroups(groups) {

    }
}