const discord = require('discord.js');
let fs = require('fs');
let path = require('path');

const CommandGroup = require('CommandGroup');

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
         * @type {Collection<String, Command>}
         */
        this.commands = new discord.Collection();

        /**
         * Registered groups
         * @type {Collection<String, Command>}
         */
        this.commandGroups = new discord.Collection();

        /**
         * Resolved path to the bot's command directory
         * @type {?String}
         */
        this.commandsPath = null;

        /**
         * Has the command groups been defined?
         * @type {boolean}
         * @private
         */
        this._groupsRegistered = false;
    }

    registerGroups(options) {
        if(this._groupsRegistered) throw new Error(`Command groups have already been registered`);
        if(!options) throw new Error(`options was not defined`);
        if(typeof options !== 'object') throw new TypeError(`options must be an object`);
        if(!options.groups) throw new Error(`options.groups was not defined`);
        if(!Array.isArray(options.groups)) throw new TypeError(`options.groups must be an array`);
        if(options.groups.length < 1) throw new Error(`options.groups array is empty`);
        if(!options.commandsPath) throw new Error(`options.commandsPath was not defined`);
        if(typeof options.commandsPath !== 'string') throw new TypeError(`options.commandsPath must be a string`);

        this._registerCommandPath(options.commandsPath);

        for(let i=0; i<options.groups.length; i++) {
            if(typeof options.groups[i] !== 'object') throw new TypeError(`group at element ${i+1} is not of type object`);
            if(!options.groups[i].id) throw new Error(`groups.id does not exist at element ${i+1}`);
            if(!options.groups[i].name) throw new Error(`groups.name does not exist at element ${i+1}`);
            if(!fs.existsSync(path.join(this.commandsPath, `./${options.groups[i].id}`))) throw new Error(`no command path exists for group ${i+1}`);
        }

        this._registerCommandGroups(options.groups);


        this._groupsRegistered = true;
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

    /**
     * Registers multiple command groups
     * @param groups
     * @private
     */
    _registerCommandGroups(groups) {
        for(let i=0; i<groups.length; i++) {
            this._registerCommandGroup(groups[i].id, groups[i].name);
        }
    }

    /**
     * Registers a single command group
     * @param id
     * @param name
     * @returns {CommandGroup}
     * @private
     */
    _registerCommandGroup(id, name) {
        let exists = this.commandGroups.get(id);
        if(exists) return this.commandGroups.get(id).rename(name);
        let group = new CommandGroup(this.client, id, name);
        this.commandGroups.set(id, group);
        return group;
    }
}