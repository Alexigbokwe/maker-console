"use strict";
const sqlRollDownProgram = require("./program");

class SqlRollDownCommand {
  static async handle(program) {
    await program
      .command("sql-rolldown [migrationName]")
      .alias("sqlrd")
      .description("Undo the last or specific migration that was run")
      .action((migrationName) => {
        sqlRollDownProgram.handle(migrationName);
      });
  }
}

module.exports = SqlRollDownCommand;
