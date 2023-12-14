const express = require("express");
var amqp = require('amqplib/callback_api');
const amqpUrl = process.env.AMQP_URL || 'amqp://localhost:5672';
const app = express();

async function connect() {
  try {
    amqp.connect(amqpUrl, function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        var queueName = 'my_queue';
        channel.assertQueue(queueName, {
          durable: false
        });
        console.log(' [*] Waiting for messages in %s. To exit press CTRL+C', queueName);
        channel.consume(queueName, function (message) {
          console.log(' [x] Received %s', message.content.toString());
        }, {
          noAck: true
        });
      });
    })
  } catch (error) {
    console.log({ error });
  }
}

connect();

app.listen(8001, () => {
  console.log("Listening on PORT 8001");
});