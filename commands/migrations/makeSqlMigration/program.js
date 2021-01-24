"use strict";
const BaseCommand = require("../../baseCommand");
const shell = require("shelljs");
const Ora = require("ora");
const spinner = Ora("Processing: ");

class MakeSqlMigratiomProgram {
  static async handle(modelName) {
    modelName = modelName.toLowerCase();
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Generating Migration";
    try {
      shell.exec("npx knex migrate:make " + modelName);
      await BaseCommand.success(
        "\n" +
          modelName +
          " migration successfully generated in Database/Migrations folder",
      );
      spinner.color = "green";
      spinner.text = "Completed";
      spinner.succeed("Done 😊😘");
    } catch (error) {
      shell.exec("npm install knex -g");
      shell.exec("npx knex migrate:make " + modelName);
      await BaseCommand.success(
        "\n" +
          modelName +
          " migration successfully generated in Database/Migrations folder",
      );
      spinner.color = "green";
      spinner.text = "Completed";
      spinner.succeed("Done 😊😘");
    }
  }
}

module.exports = MakeSqlMigratiomProgram;
