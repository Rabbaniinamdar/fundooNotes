/* eslint-disable prettier/prettier */
var amqp = require('amqplib/callback_api');

export const sendMessage = (message) => {
    return new Promise((resolve, reject) => {
        amqp.connect('amqp://localhost:5672', function (error0, connection) {
            if (error0) {
                reject(error0);
            }
            connection.createChannel(function (error1, channel) {
                if (error1) {
                    reject(error1);
                }
                var queueName = 'my_queue';
                channel.assertQueue(queueName, {
                    durable: false
                });
                const messageString = JSON.stringify(message);
                channel.sendToQueue(queueName, Buffer.from(messageString));

                console.log(' [x] Sent %s', messageString);

                channel.close(function () {
                    connection.close();
                    resolve();
                });
            });
        });
    });
};
