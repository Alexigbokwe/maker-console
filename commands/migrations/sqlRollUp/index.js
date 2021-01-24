"use strict";
const sqlRollUpProgram = require("./program");

class SqlRollUpCommand {
  static async handle(program) {
    await program
      .command("sql-rollup [migrationName]")
      .alias("sqlru")
      .description(
        "Run the next or specific migration that has not yet been run",
      )
      .action((migrationName) => {
        sqlRollUpProgram.handle(migrationName);
      });
  }
}

module.exports = SqlRollUpCommand;
