"use strict";
const middlewareProgram = require("./program");

class MiddlewareCommand {
  static async handle(program) {
    await program
      .command("make-middleware <middlewarename>")
      .description("Create a new middleware class")
      .action((middlewarename) => {
        middlewareProgram.handle(middlewarename);
      });
  }
}

module.exports = MiddlewareCommand;
