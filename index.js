"use strict";
const pathTo = process.env.PWD;
const program = require("commander");
program.version("1.0.0").description("ExpressWebJs Command Line");
const config = require("./config");
const processMakerCommands = Symbol("processMakerCommands");
const checkCommadsLength = Symbol("checkCommadsLength");
const checkKernelLength = Symbol("checkKernelLength");
const processUserCommand = Symbol("processUserCommand");
const buildCommandWithArguments = Symbol("buildCommandWithArguments");

class Console {
  /**
   * Run Maker commands
   * @param {Array} commands
   * @param {Array} kernel
   */
  static async run(commands, kernel) {
    let makerCommands = this[checkCommadsLength](commands);
    makerCommands != null
      ? await this[processMakerCommands](makerCommands)
      : null;
    let userCommand = this[checkKernelLength](kernel.commands());
    userCommand != null ? await this[processUserCommand](userCommand) : null;
    program.parse(process.argv);
  }

  checkCommandName(name) {
    if (typeof config.commands[name] == "string") {
      throw "Can't recreate maker commend, try renaming your command signature";
    }
  }

  static async [processMakerCommands](makerCommands) {
    await makerCommands.forEach((command) => {
      let commandName = command.split("/");
      let file = require(`./${
        config.commands[`${commandName[commandName.length - 1]}`]
      }`);
      file.handle(program);
    });
  }

  static async [processUserCommand](userCommand) {
    userCommand.forEach((path) => {
      let commandPath = `${pathTo}/${path}`;
      let commandObject = require(commandPath);
      let command = new commandObject();
      let handle = `${command.signature}`;
      if (command.arguments.length > 0) {
        command.arguments.forEach((argument) => {
          if (argument.mode == "REQUIRED") {
            handle = `${handle} <${argument.name}>`;
          } else if (argument.mode == "OPTIONAL") {
            handle = `${handle} [${argument.name}]`;
          }
        });
        this[buildCommandWithArguments](command, handle);
      } else {
        program
          .command(handle)
          .description(command.description)
          .action(() => {
            command.fire();
          });
      }
    });
  }

  static [buildCommandWithArguments](command, handle) {
    let count = command.arguments.length;
    switch (count) {
      case 2:
        program
          .command(handle)
          .description(command.description)
          .action((value1, value2) => {
            command.fire(value1, value2);
          });
        break;
      case 3:
        program
          .command(handle)
          .description(command.description)
          .action((value1, value2, value3) => {
            command.fire(value1, value2, value3);
          });
        break;
      case 4:
        program
          .command(handle)
          .description(command.description)
          .action((value1, value2, value3, value4) => {
            command.fire(value1, value2, value3, value4);
          });
        break;
      case 5:
        program
          .command(handle)
          .description(command.description)
          .action((value1, value2, value3, value4, value5) => {
            command.fire(value1, value2, value3, value4, value5);
          });
        break;

      default:
        program
          .command(handle)
          .description(command.description)
          .action((value1) => {
            command.fire(value1);
          });
        break;
    }
  }

  static [checkCommadsLength](commands) {
    return commands.length > 0 ? commands : null;
  }

  static [checkKernelLength](kernel) {
    return kernel.length > 0 ? kernel : null;
  }
}

module.exports = Console;
