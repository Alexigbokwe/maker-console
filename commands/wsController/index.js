const wscontrollerProgram = require("./program");

class WsControllerCommand {
  static async handle(program) {
    await program
      .command("make-ws-controller <wsControllerName>")
      .description("Create a new web socket controller class")
      .action((wsControllerName) => {
        wscontrollerProgram.handle(wsControllerName);
      });
  }
}

module.exports = WsControllerCommand;
