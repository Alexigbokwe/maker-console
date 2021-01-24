"use strict";
const scheduledProgram = require("./program");

class ListenerCommand {
  static async handle(program) {
    await program
      .command("run-schedule")
      .description("Run the scheduled commands")
      .action(() => {
        scheduledProgram.handle();
      });
  }
}

module.exports = ListenerCommand;
