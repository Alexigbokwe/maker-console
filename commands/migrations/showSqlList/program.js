"use strict";
const BaseCommand = require("../../baseCommand");
const shell = require("shelljs");
const Ora = require("ora");
const spinner = Ora("Processing: ");

class ShowSqlListProgram {
  static async handle() {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Generating Migration List: ";
    try {
      shell.exec("npx knex migrate:list", (error, success) => {
        if (error) {
          BaseCommand.error(error);
          spinner.color = "red";
          spinner.text = "failed";
          spinner.fail("");
        }
        if (success) {
          BaseCommand.success(success);
          spinner.color = "green";
          spinner.text = "Completed";
          spinner.succeed("Done 😊😘");
        }
      });
    } catch (error) {
      shell.exec("npm install knex -g");
      shell.exec("npx knex migrate:list", (error, success) => {
        if (error) {
          BaseCommand.error(error);
          spinner.color = "red";
          spinner.text = "failed";
          spinner.fail("");
        }
        if (success) {
          BaseCommand.success(success);
          spinner.color = "green";
          spinner.text = "Completed";
          spinner.succeed("Done 😊😘");
        }
      });
    }
  }
}

module.exports = ShowSqlListProgram;
