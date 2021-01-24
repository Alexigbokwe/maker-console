"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const Ora = require("ora");
const spinner = Ora("Processing: ");
const nextStep = Symbol("nextStep");
const generateController = Symbol("generateController");

class WsControllerProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let check = await BaseCommand.checkFileExists(
      "./App/Http/Controller/Ws/" + name + ".js",
    );
    if (check == false) {
      await this[nextStep](name);
    } else {
      return BaseCommand.error(
        `${name} web socket controller class already exists`,
      );
    }
  }

  static [nextStep](name) {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Generating Web Socket Controller Class";
    fs.appendFile(
      "./App/Http/Controller/Ws/" + name + ".js",
      this[generateController](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          "\n" +
            name +
            ".js web socket class successfully generated in App/Http/Controller/Ws folder",
        );
        spinner.color = "green";
        spinner.text = "Completed";
        spinner.succeed("Done 😊😘");
        return true;
      },
    );
  }

  static [generateController](name) {
    let body = `"use strict";
        const WsBaseController = require("@WsBaseController");

        class ${name} extends WsBaseController {
          constructor(socket) {
            super(socket);
            this.socket = socket;
          }

          onMessage(data) {
            // same as: socket.on('message')
            this.socket.on('message');
            console.log(data);
          }

          onClose() {
            // same as: socket.on('close')
          }

          onError() {
            // same as: socket.on('error')
          }
        }

        module.exports = ${name};`;
    return body;
  }
}

module.exports = WsControllerProgram;
