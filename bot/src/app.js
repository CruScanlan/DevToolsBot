const config = require("../config.json");
const path = require('path');
const cote = require('cote');
const sbf4d = require('sbf4d');
const Raven = require('raven');

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
});

app.coteDbRequester = coteDbRequester;

//Raven.config(config.logging.sentryDSN).install();

app.on('ready', () => {
    console.log('Bot Has Started Running!');
});



app.login(config.token);