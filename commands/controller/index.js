const controllerProgram = require("./program");

class ControllerCommand {
  static async handle(program) {
    await program
      .command("make-controller <controllername>")
      .option("-r", "-resource", "Controller Resource Methods")
      .description("Create a new controller class")
      .action((controllername, resource) => {
        controllerProgram.handle(controllername, resource.r);
      });
  }
}

module.exports = ControllerCommand;
