
class Command {
    constructor(client, options) {

        /**
         * The client for the command
         * @name Command#client
         * @type {client}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The name for the command
         */
        this.name =  options.name;

        /**
         * The aliases for the command
         * @type {Array<String>}
         */
        this.aliases = options.aliases || [];

        /**
         * The id for the group
         * @type {String}
         */
        this.groupID = options.group;

        /**
         * The group the command belongs to
         * @type {CommandGroup}
         */
        this.group = null;

        /**
         * The time to throttle the command for in miliseconds
         * @type {Number}
         */
        this.throttling = options.throttling || -1;

        /**
         * All the throttle objects for the Command
         * @type {Map<String, Object>}
         * @private
         */
        this._throttles = new Map();
    }

    run(msg, args, client) {
        throw new Error(`Command does not have a run method`);
    }

    //TODO: Write reload method
    //TODO: Write throttling method
    /**
     * Reloads the command
     */
    reload() {
    }
}

module.exports = Command;