const discord = require('discord.js');

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

    _registerCommand(command) {

    }

    registerCommandGroups(groups) {
        if(!Array.isArray(groups)) throw new TypeError(`groups must be an array`);


    }
}