
class Command {
    constructor(client, options) {

        /**
         * The client for the command
         * @name Command#client
         * @type {client}
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
         */
        this.throttles = new Map();
    }

    run(msg, args, client) {
        throw new Error(`Command does not have a run method`);
    }

    //TODO: Write reload method
    /**
     * Reloads the command
     */
    reload() {
    }

    /**
     * Returns an existing throttle object for a userID or creates a new one and returns it
     * @param userID
     * @returns {Object}
     */
    throttle(userID) {
        let throttle = this.throttles.get(userID);
        if(!throttle) {
            throttle = {
                start: Date.now(),
                timeout: setTimeout(()=> {
                    this.throttles.delete(userID);
                }, this.throttling)
            };
            this.throttles.set(userID, throttle);
        }
        return throttle;
    }
}

module.exports = Command;