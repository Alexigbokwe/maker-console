"use strict";
const sqlProgram = require("./program");

class SqlCommand {
  static async handle(program) {
    await program
      .command("make-sql-model <modelname>")
      .option("-m", "-migration", "Generation migration with sql model")
      .description("Create a new sql model class")
      .action((modelname, resource) => {
        sqlProgram.handle(modelname, resource.m);
      });
  }
}

module.exports = SqlCommand;
