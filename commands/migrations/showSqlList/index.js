"use strict";
const showSqlListProgram = require("./program");

class ShowSqlListCommand {
  static async handle(program) {
    await program
      .command("show-sql-list")
      .description("Show list of both completed and pending migrations")
      .action(() => {
        showSqlListProgram.handle();
      });
  }
}

module.exports = ShowSqlListCommand;
