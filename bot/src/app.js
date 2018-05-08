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
}, {log: false});

app.coteDbRequester = coteDbRequester;

app.on('ready', () => {
    console.log('Bot Has Started Running!');
});



app.login(config.token);