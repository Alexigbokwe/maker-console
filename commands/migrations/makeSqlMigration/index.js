"use strict";
const makeSqlMigratiomProgram = require("./program");

class MakeSqlMigratiomCommand {
  static async handle(program) {
    await program
      .command("make-sql-migration <migrationName>")
      .alias("msqlm")
      .description("Create a new migration file")
      .action((migrationName) => {
        makeSqlMigratiomProgram.handle(migrationName);
      });
  }
}

module.exports = MakeSqlMigratiomCommand;
