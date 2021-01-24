"use strict";
const sqlRollBackProgram = require("./program");

class SqlRollBackCommand {
  static async handle(program) {
    await program
      .command("sql-rollback")
      .option("-all", "-all", "Rollback all completed migrations")
      .alias("sqlrb")
      .description("Rollback the last batch of migrations")
      .action((all) => {
        sqlRollBackProgram.handle(all.r);
      });
  }
}

module.exports = SqlRollBackCommand;
