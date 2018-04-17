let cote = require('cote');
let trelloServicePublisher = new cote.Publisher({
    name: 'Trello Service Publisher',
    broadcasts: ['trello-card-added']
});
/*
    trelloServicePublisher.publish('trello-card-added', 'test');
 */