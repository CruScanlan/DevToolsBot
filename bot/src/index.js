const config = require("../config.json");
const path = require('path');

let cote = require('cote');
let botServiceSubscriber = new cote.Subscriber({
    name: 'Bot Service Subscriber',
    subscribesTo: ['trello-card-added']
});

/*
botServiceSubscriber.on('trello-card-added', (req) => {
    console.log(req);
    bot.guilds.find('id', '246919128701599744').channels.find('id', '246919128701599744').send(req);
});
*/

const sbf4d = require('sbf4d');
const bot = new sbf4d.Client({
    commandPrefix: '!',
    owner: '138424630850486272',
    commandGroups: [
        {id: 'trello', name:'Trello'}
    ],
    commandsPath: path.join(__dirname, './commands')
});

let Raven = require('raven');
//Raven.config(config.logging.sentryDSN).install();

bot.on('ready', () => {
    console.log('Bot Has Started Running!');
});



bot.login(config.token);