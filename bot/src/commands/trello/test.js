let {Command} = require('sbf4d');

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
        msg.reply('test');
    }
};