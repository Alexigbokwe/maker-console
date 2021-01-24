"use strict";
const BaseCommand = require("../../baseCommand");
const shell = require("shelljs");
const Ora = require("ora");
const spinner = Ora("Processing: ");
const undoLastMigraation = Symbol("undoLastMigraation");
const undoSpecifiedMigration = Symbol("undoSpecifiedMigration");
const runNextMigration = Symbol("runNextMigration");
const runSpecifiedMigration = Symbol("runSpecifiedMigration");

class SqlRollUpProgram {
  static async handle(name) {
    return name ? this[runSpecifiedMigration](name) : this[runNextMigration]();
  }

  //Run the next migration that has not yet been run
  static [runNextMigration]() {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Running the next migration that has not yet been run: ";
    try {
      shell.exec("npx knex migrate:up", (error, success) => {
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
      shell.exec("npx knex migrate:up", (error, success) => {
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
   * Run the specified migration that has not yet been run
   * @param {String} name
   */
  static [runSpecifiedMigration](name) {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Running " + name + " migration that has not yet been run: ";
    try {
      shell.exec("npx knex migrate:up " + name, (error, success) => {
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
      shell.exec("npx knex migrate:up " + name, (error, success) => {
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

module.exports = SqlRollUpProgram;
