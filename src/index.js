const config = require("../config.json");
const Discord = require('discord.js');
const bot = new Discord.Client();

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