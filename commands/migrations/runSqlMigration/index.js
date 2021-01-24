"use strict";
const runSqlMigratiomProgram = require("./program");

class RunSqlMigratiomCommand {
  static async handle(program) {
    await program
      .command("run-sql-migration")
      .alias("rsqlm")
      .description("Run Sql Migrations")
      .action(() => {
        runSqlMigratiomProgram.handle();
      });
  }
}

module.exports = RunSqlMigratiomCommand;
