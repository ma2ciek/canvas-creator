/// <reference path="typings/index.d.ts" />
'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 9000
});

const handleIfError = err => { if (err) throw err };

server.register(require('inert'), (err) => {
    handleIfError(err);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './'
            }
        }
    })

})


server.start((err) => {
    handleIfError(err);    
    console.log('port: 9000');
});