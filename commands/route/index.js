"use strict";
const routeProgram = require("./program");

class RouteCommand {
  static async handle(program) {
    await program
      .command("make-route <routename>")
      .description("Create a new route folder")
      .action((routename) => {
        routeProgram.handle(routename);
      });
  }
}

module.exports = RouteCommand;
