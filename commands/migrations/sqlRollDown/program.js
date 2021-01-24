"use strict";
const BaseCommand = require("../../baseCommand");
const shell = require("shelljs");
const Ora = require("ora");
const spinner = Ora("Processing: ");
const undoLastMigraation = Symbol("undoLastMigraation");
const undoSpecifiedMigration = Symbol("undoSpecifiedMigration");

class SqlRollDownProgram {
  static async handle(name) {
    return name
      ? await this[undoSpecifiedMigration](name)
      : await this[undoLastMigraation]();
  }

  //Undo the last migration that was run
  static async [undoLastMigraation]() {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Undoing the last migration that was run: ";
    try {
      shell.exec("npx knex migrate:down", (error, success) => {
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
      shell.exec("npx knex migrate:down", (error, success) => {
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

  /**
   * Undo the specified migration that was run
   * @param {String} name
   */
  static async [undoSpecifiedMigration](name) {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Undoing " + name + " migration that was run: ";
    try {
      shell.exec("npx knex migrate:down " + name, (error, success) => {
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
      shell.exec("npx knex migrate:down " + name, (error, success) => {
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

module.exports = SqlRollDownProgram;
