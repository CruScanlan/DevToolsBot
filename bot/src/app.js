const config = require("../config.json");
const path = require('path');
const cote = require('cote');
const sbf4d = require('sbf4d');
const Raven = require('raven');

//Raven.config(config.logging.sentryDSN).install();

let app = new sbf4d.Client({
    commandPrefix: '!',
    owner: '138424630850486272',
    commandGroups: [
        {id: 'trello', name:'Trello'}
    ],
    commandsPath: path.join(__dirname, './commands')
});

let coteDbRequester = new cote.Requester({
    name: 'db-requester',
    key: "db"
}, {log: true});

app.coteDbRequester = coteDbRequester;

let insertAndUpdateGuild = (guild) => {
    let queryParams = {
        guild_id: guild.id,
        guild_name: guild.name,
        guild_memberCount: guild.memberCount,
        guild_ownerID: guild.ownerID,
        guild_region: guild.region
    };
    app.coteDbRequester.send({type: "db-guilds-insert-and-update", queryParams}, (res) => {
        console.log(res);
    })
};

app.on('ready', () => {
    console.log('Bot Has Started Running!');
}).on('guildCreate', guild => {
    insertAndUpdateGuild(guild);
}).on('guildUpdate', (oldGuild, newGuild) => {
    insertAndUpdateGuild(newGuild);
});

app.login(config.token);