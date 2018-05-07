const config = require('../config.json');
const endpoints = require('./endpoints');
const CoteServiceRegistry = require('./handlers/CoteServiceRegistry');

let coteRegistry = new CoteServiceRegistry(config.mysql);
coteRegistry.registerEndpoints(endpoints);