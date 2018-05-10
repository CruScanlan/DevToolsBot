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
    })
};

let insertAndUpdateGuildManager = (guild, member) => {
    let queryParams = {
        manager_id: member.id,
        guild_id: guild.id
    };
    app.coteDbRequester.send({type: "db-guild-managers-insert-and-update", queryParams}, res => {
    })
};

let leftGuild = (guild) => {
    let queryParams = {
        guild_id: guild.id
    };
    app.coteDbRequester.send({type: "db-guilds-left", queryParams}, res => {
    })
};

app.on('ready', () => {
    console.log('Bot Has Started Running!');
}).on('guildCreate', guild => {
    insertAndUpdateGuild(guild);
    let adminMembers = guild.members.filter(member => member.hasPermission('ADMINISTRATOR')).array();
    if(adminMembers.length < 1) return;
    for(let i=0; i<adminMembers.length; i++) {
        insertAndUpdateGuildManager(guild, adminMembers[i]);
    }
}).on('guildUpdate', (oldGuild, newGuild) => {
    insertAndUpdateGuild(newGuild);
}).on('guildMemberAdd', guildMember => {
    insertAndUpdateGuild(guildMember.guild);
}).on('guildMemberRemove', guildMember => {
    insertAndUpdateGuild(guildMember.guild);
}).on('guildDelete', guild => {
    leftGuild(guild);
});

app.login(config.token);