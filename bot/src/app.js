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

let insertAndUpdateGuildManagers = (guild) => {
    insertAndUpdateGuild(guild);
    let adminMembers = guild.members.filter(member => {return member.hasPermission('ADMINISTRATOR') && !member.user.bot}).array();
    if(adminMembers.length < 1) return;
    for(let i=0; i<adminMembers.length; i++) {
        insertAndUpdateGuildManager(guild, adminMembers[i]);
    }
};

let insertAndUpdateGuildManager = (guild, member) => {
    let queryParams = {
        manager_id: member.id,
        guild_id: guild.id
    };
    app.coteDbRequester.send({type: "db-guild-managers-insert-and-update", queryParams}, res => {
    })
};

let leftGuild = (guild_id) => {
    app.coteDbRequester.send({type: "db-guilds-left", queryParams: {guild_id}}, res => {
    })
};

app.on('ready', () => {
    console.log('Bot Has Started Running!');

    app.coteDbRequester.send({type: "db-guilds-get-all", queryParams: {}}, res => {
        let dbGuildIds = res.rows.filter(row => {return row.joined === 1}).map(row => {return row.guild_id});
        let clientGuildIds = app.guilds.map(guild => {return guild.id});
        for(let i=0; i<dbGuildIds.length; i++) { //check what needs removing
            if(clientGuildIds.indexOf(dbGuildIds[i]) === -1) {
                leftGuild(dbGuildIds[i]);
            }
        }
        for(let i=0; i<clientGuildIds.length; i++) { //check what needs adding
            if(dbGuildIds.indexOf(clientGuildIds[i]) === -1) {
                insertAndUpdateGuild(app.guilds.get(clientGuildIds[i]));
                insertAndUpdateGuildManagers(app.guilds.get(clientGuildIds[i]));
            }
        }
    })

}).on('guildCreate', guild => {
    insertAndUpdateGuildManagers(guild);
}).on('guildUpdate', (oldGuild, newGuild) => {
    insertAndUpdateGuild(newGuild);
}).on('guildMemberAdd', guildMember => {
    insertAndUpdateGuild(guildMember.guild);
}).on('guildMemberRemove', guildMember => {
    insertAndUpdateGuild(guildMember.guild);
}).on('guildDelete', guild => {
    leftGuild(guild.id);
});

app.login(config.token);