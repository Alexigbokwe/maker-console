"use strict";
const consoleProgram = require("./program");

class ListenerCommand {
  static async handle(program) {
    await program
      .command("make-command <commandName>")
      .description("Create a new Maker command")
      .action((commandName) => {
        consoleProgram.handle(commandName);
      });
  }
}

module.exports = ListenerCommand;
