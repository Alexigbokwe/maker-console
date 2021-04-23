"use strict";
const providerProgram = require("./program");

class providerCommand {
  static async handle(program) {
    await program
      .command("make-provider [providerName]")
      .description("Create new service provider class")
      .action((providerName) => {
        providerProgram.handle(providerName);
      });
  }
}

module.exports = providerCommand;
