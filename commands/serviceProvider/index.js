"use strict";
const providerProgram = require("./program");

class providerCommand {
  static async handle(program) {
    await program
      .command("make-provider [providerName]")
      .description("Create a new job class")
      .action((providerName) => {
        providerProgram.handle(providerName);
      });
  }
}

module.exports = providerCommand;
