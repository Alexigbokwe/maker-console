"use strict";
const listenerProgram = require("./program");

class ListenerCommand {
  static async handle(program) {
    await program
      .command("make-listener <listenername>")
      .description("Create a new listener class")
      .action((listenername) => {
        listenerProgram.handle(listenername);
      });
  }
}

module.exports = ListenerCommand;
