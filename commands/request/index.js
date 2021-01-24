"use strict";
const requestProgram = require("./program");

class RequestCommand {
  static async handle(program) {
    await program
      .command("make-request <requestname>")
      .description("Create a new request class")
      .action((requestname) => {
        requestProgram.handle(requestname);
      });
  }
}

module.exports = RequestCommand;
