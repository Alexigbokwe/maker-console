"use strict";
const authProgram = require("./program");

class AuthCommand {
  static async handle(program) {
    await program
      .command("make-auth")
      .description("Create a new auth class")
      .action(() => {
        authProgram.handle();
      });
  }
}

module.exports = AuthCommand;
