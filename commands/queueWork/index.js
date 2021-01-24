"use strict";
const queueWorkerProgram = require("./program");

class QueueWorkerCommand {
  static async handle(program) {
    await program
      .command("queue-work [queueName]")
      .description("Start processing jobs on the queue as a daemon")
      .action((queueName) => {
        queueWorkerProgram.handle(queueName);
      });
  }
}

module.exports = QueueWorkerCommand;
