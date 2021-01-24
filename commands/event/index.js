"use strict";
const eventProgram = require("./program");

class EventCommand {
  static async handle(program) {
    await program
      .command("make-event <eventname>")
      .description("Create a new event class")
      .action((eventname) => {
        eventProgram.handle(eventname);
      });
  }
}

module.exports = EventCommand;
