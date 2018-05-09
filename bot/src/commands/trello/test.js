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
        let queryParams = {
            guild_id: msg.guild.id,
            guild_name: msg.guild.name,
            guild_memberCount: msg.guild.memberCount,
            guild_ownerID: msg.guild.ownerID,
            guild_region: msg.guild.region
        };
        this.client.coteDbRequester.send({type: "db-guilds-insert-and-update", queryParams}, (res) => {
            console.log(res);
        })
    }
};