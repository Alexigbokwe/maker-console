"use strict";
const BaseCommand = require("../baseCommand");
require('dotenv').config();
const Config = require("../../../../App/Config/queue");
const FS = require("fs");
const consumeViaRabbitmq = Symbol("consumeViaRabbitmq");
const callHandlers = Symbol("callHandlers");

class QueueWorkerProgram {
  static async handle(name) {
    switch (Config.default) {
        case "rabbitmq":
            this[consumeViaRabbitmq](name);
            break;
        default:
            break;
    }
  }

  static [consumeViaRabbitmq](jobQueue = null) {
    let queue = jobQueue;
    const amqp = require("amqplib/callback_api");
    try {
      amqp.connect(
        `${Config.connections[Config.default].host}:${Config.connections[Config.default].port}`, (error, connect) => {
          if (error) throw error;
          if (queue == null) queue = Config.connections[Config.default].queue;
          connect.createChannel((channelError, channel) => {
            if (channelError) BaseCommand.error(channelError.message);
            channel.assertQueue(queue);
            BaseCommand.success(`[*] Waiting for messages in ${queue} queue. To exit press CTRL+C`)
            channel.consume(queue, (msg) => {
              BaseCommand.success(`Received ${msg.content.toString()}`);
              let data = JSON.parse(msg.content.toString());
              this[callHandlers](data);
              channel.ack(msg);
            });
          })
        });
    } catch (error) {
      BaseCommand.error(error.message)
    }
  }

  static [callHandlers](msg = null) {
    FS.readdirSync(`${__dirname}/../../../../App/Jobs/`).forEach((file) => {
      let jobObject = require(`${__dirname}/../../../../App/Jobs/${file}`);
      let job = new jobObject();
      if (job.signature == msg.signature) {
        try {
          job.handle(msg.data);
        } catch (e) {
          console.log(e);
        }
      }
    });
  }
}

module.exports = QueueWorkerProgram;
