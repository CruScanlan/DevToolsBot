let Command = require('../../handlers/Command');

module.exports = class AppleCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'Apple',
            group: 'test',
            aliases: [
                'app'
            ],
            throttling: 1000
        })
    }

    async run(msg, args, client) {
        msg.reply('test');
    }
};