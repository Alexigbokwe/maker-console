"use strict";
const noSqlProgram = require("./program");

class NoSqlCommand {
  static async handle(program) {
    await program
      .command("make-nosql-model <modelname>")
      .description("Create a new nosql model class")
      .action((modelname) => {
        noSqlProgram.handle(modelname);
      });
  }
}

module.exports = NoSqlCommand;
