#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var exchange = 'mr_decremento';
        var args = process.argv.slice(2);
        var msg = '{"type":"NoRecomendar", "idUsuario":"1234", "etiqueta":"Bailar", "idArticulo":"123123123"}';
        var severity = 'mr_decremento';

        channel.assertExchange(exchange, 'direct', {
            durable: false
        });

        channel.publish(exchange, severity, Buffer.from(msg));
 
        console.log(" [x] Sent %s: '%s'", severity, msg);
    });

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});