const config = require("../config.json");

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

const Discord = require('discord.js');
const bot = new Discord.Client();

let Raven = require('raven');
//Raven.config(config.logging.sentryDSN).install();

bot.on('ready', () => {
    console.log('Bot Has Started Running!');
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

bot.login(config.token);