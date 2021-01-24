"use strict";
const chalk = require("chalk");
const fs = require("fs");
const Ora = require("ora");
class BaseCommand {
  static progress() {
    let spinner = Ora;
    return spinner;
  }
  static async error(err) {
    return console.log(chalk.red(`Error: ${err}`));
  }

  static async success(message) {
    return console.log(chalk.green(message));
  }

  static warning(message) {
    return console.log(chalk.yellow(message));
  }

  static async checkFileExists(file) {
    return fs.promises
      .access(file, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false);
  }

  static checkFolderExists(name) {
    fs.access(name, function (err) {
      if (err && err.code === "ENOENT") {
        fs.mkdir(name, (err) => {
          if (err) {
            BaseCommand.error(err);
            return false;
          }
        });
      }
    });
    return true;
  }
}

module.exports = BaseCommand;
