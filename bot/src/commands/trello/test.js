const {Command} = require('sbf4d');

module.exports = class TestCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'Test',
            group: 'trello',
            aliases: [
                't'
            ],
            throttling: 2000
        })
    }

    run(msg, args) {
        this.client.coteDbRequester.send({type: "db-guilds-get-all"}, (guilds) => {
            msg.reply(guilds.rows[0].guild_name);
        })
    }
};