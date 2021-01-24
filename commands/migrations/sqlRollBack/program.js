"use strict";
const BaseCommand = require("../../baseCommand");
const shell = require("shelljs");
const Ora = require("ora");
const spinner = Ora("Processing: ");
const runAll = Symbol("runAll");
const runNormal = Symbol("runNormal");

class SqlRollBackProgram {
  static async handle(all) {
    return all ? this[runAll]() : this[runNormal]();
  }

  static async [runAll]() {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Rolling back all the completed migrations: ";
    try {
      shell.exec("npx knex migrate:rollback --all", (error, success) => {
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
      shell.exec("npx knex migrate:rollback --all", (error, success) => {
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

  static async [runNormal]() {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Rolling back the last batch of migrations: ";
    try {
      shell.exec("npx knex migrate:rollback", (error, success) => {
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
      shell.exec("npx knex migrate:rollback", (error, success) => {
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

module.exports = SqlRollBackProgram;
