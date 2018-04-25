const discord = require('discord.js');
let fs = require('fs');
let path = require('path');

const CommandGroup = require('./CommandGroup');
const CommandDispatcher = require('./CommandDispatcher');

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
         * Command dispatcher for registry, is defined on register method
         * @type {CommandDispatcher}
         */
        this.commandDispatcher = null;

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
         * The command prefix
         * @type {String}
         */
        this.commandsPrefix = null;

        /**
         * Has the command groups been defined?
         * @type {boolean}
         * @private
         */
        this._groupsRegistered = false;
    }

    /**
     * Registers all the groups, command path and commands prefix
     * @param options
     * @returns {CommandRegistry}
     */
    register(options) {
        if(this._groupsRegistered) throw new Error(`Command groups have already been registered`);
        if(!options) throw new Error(`options was not defined`);
        if(typeof options !== 'object') throw new TypeError(`options must be an object`);
        if(!options.groups) throw new Error(`options.groups was not defined`);
        if(!Array.isArray(options.groups)) throw new TypeError(`options.groups must be an array`);
        if(options.groups.length < 1) throw new Error(`options.groups array is empty`);
        if(!options.commandsPath) throw new Error(`options.commandsPath was not defined`);
        if(typeof options.commandsPath !== 'string') throw new TypeError(`options.commandsPath must be a string`);
        if(!options.commandsPrefix) throw new Error(`options.commandPrefix was not defined`);
        if(typeof options.commandsPrefix !== 'string') throw new TypeError(`options.commandsPrefix must be a string`);
        if(options.commandsPrefix.length < 1) throw new Error(`options.commandPrefix must be at least 1 char`);

        this.commandsPrefix = options.commandsPrefix;
        this._registerCommandPath(options.commandsPath);

        for(let i=0; i<options.groups.length; i++) {
            if(typeof options.groups[i] !== 'object') throw new TypeError(`group at element ${i+1} is not of type object`);
            if(!options.groups[i].id) throw new Error(`groups.id does not exist at element ${i+1}`);
            if(!options.groups[i].name) throw new Error(`groups.name does not exist at element ${i+1}`);
            if(!fs.existsSync(this._getGroupDirectoryPath(options.groups[i].id))) throw new Error(`no command path exists for group ${i+1}`);
        }

        this._registerCommandGroups(options.groups);
        this._groupsRegistered = true;

        this._registerCommands();
        this.commandDispatcher = new CommandDispatcher(this.client, this);

        return this;
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

    /**
     * Registers all commands in the command path
     * @returns {CommandRegistry}
     */
    _registerCommands() {
        if(!this._groupsRegistered) throw new Error(`command groups must be registered before commands`);
        let commandGroups = this.commandGroups.array();
        for(let i=0; i<commandGroups.length; i++) { //iterate through groups
            let groupDirectoryPath = this._getGroupDirectoryPath(commandGroups[i].id);
            let groupDirectoryFiles = fs.readdirSync(groupDirectoryPath);
            for(let j=0; j<groupDirectoryFiles.length; j++) { //iterate through files in a groups directory
                let fileSplit = groupDirectoryFiles[j].split('.');
                let fileExt = fileSplit[fileSplit.length-1];
                if(fileExt !== 'js') continue; //exclude any file without a .js extension
                this._registerCommand(commandGroups[i].id, `${groupDirectoryPath}\\${groupDirectoryFiles[j]}`); //register file as a command
            }
        }
        return this;
    }

    /**
     * Registers a single command
     * @param groupID
     * @param filePath
     * @private
     */
    _registerCommand(groupID, filePath) {
        let commandModule;
        try {
            commandModule = require(filePath);
        } catch(e) {
            throw new Error(`Error when loading command at ${filePath} | ${e.stack}\n\n |`);
        }
        let command = new commandModule(this.client);
        if(this.commands.find(cnd => cnd.name === command.name)) throw new Error(`Command ${command.name} is already registered`);
        let group = this.commandGroups.find(group => group.id === groupID);
        if(!group) throw new Error(`Group ${command.groupID} is not registered`);
        command.group = group;
        this.commands.set(command.name, command);
        group.commands.set(command.name, command);
    }

    /**
     * Registers multiple command groups
     * @param groups
     * @private
     */
    _registerCommandGroups(groups) {
        for(let i=0; i<groups.length; i++) {
            this._registerCommandGroup(groups[i].id, groups[i].name); //iterate through groups and add them
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
        if(exists) return this.commandGroups.get(id).rename(name); //if group already exists, rename it
        let group = new CommandGroup(this.client, id, name); //create new group
        this.commandGroups.set(id, group); //add the new group
        return group;
    }

    /**
     * Gets the directory for a command group
     * @param groupID
     * @returns {String}
     * @private
     */
    _getGroupDirectoryPath(groupID) {
        if(typeof groupID !== 'string') throw new TypeError(`groupID is not of type string`);
        if(!this.commandsPath) throw new Error(`commandsPath has not been defined`);
        return path.join(this.commandsPath, `./${groupID}`);
    }
}

module.exports = CommandRegistry;