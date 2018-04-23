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

bot.on('message', async msg => {
    if (msg.author.bot) return;

    if (!msg.content.startsWith(config.prefix)) return;
    let command = msg.content.split(" ")[0];
    command = command.slice(config.prefix.length).toLowerCase();
    let args = msg.content.split(" ").slice(1);
    let argsJoined = args.join(" ");

    if(command === "test") msg.reply("Test");
});
*/

const Discord = require('discord.js');
const bot = new Discord.Client();

let CommandRegistry = require('./handlers/CommandRegistry');
let commandRegistry = new CommandRegistry(bot);

commandRegistry.register({
    groups: [
        'test'
    ],
    commandsPath: path.join(__dirname, './commands')
});

let Raven = require('raven');
//Raven.config(config.logging.sentryDSN).install();

bot.on('ready', () => {
    console.log('Bot Has Started Running!');
});



bot.login(config.token);