"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const shell = require("shelljs");
const Ora = require("ora");
const spinner = Ora("Processing: ");
let createModel = Symbol("createModel");
let modelBody = Symbol("modelBody");
let modelBodyWithMigration = Symbol("modelBodyWithMigration");

class SqlProgram {
  static async handle(name, resource = null) {
    name = name[0].toUpperCase() + name.slice(1);
    let check = await BaseCommand.checkFileExists(
      "./App/Model/" + name + "_model.js",
    );
    if (check == false) {
      await this[createModel](name, resource);
    } else {
      return BaseCommand.error(`${name} Sql model class already exists`);
    }
  }

  static async [createModel](modelName, resource) {
    if (resource == "Generation migration with sql model") {
      spinner.start();
      spinner.color = "magenta";
      spinner.text = "Generating Model"; 
      fs.appendFile(
        "./App/Model/" + modelName + "_model.js",
        await this[modelBodyWithMigration](modelName),
        function (err) {
          if (err) BaseCommand.error(err);
          BaseCommand.success(
            "\n" +
              modelName +
              "_model.js class successfully generated in App/Model folder",
          );
          spinner.color = "green";
          spinner.text = "Completed";
          spinner.succeed("Done 😊😘");
        },
      );
    } else {
      spinner.start();
      spinner.color = "magenta";
      spinner.text = "Generating Model";
      fs.appendFile(
        "./App/Model/" + modelName + "_model.js",
        await this[modelBody](modelName),
        function (err) {
          if (err) BaseCommand.error(err);
          BaseCommand.success(
            "\n" +
              modelName +
              "_model.js class successfully generated in App/Model folder",
          );
          spinner.color = "green";
          spinner.text = "Completed";
          spinner.succeed("Done 😊😘");
        },
      );
    }
  }

  static [modelBody](name) {
    let tableName = (name = name[0].toLowerCase() + name.slice(1));
    let modelName = (name = name[0].toUpperCase() + name.slice(1));
    let body = `"use strict";
    const Model = require("@elucidate/Model");
    class ${modelName} extends Model{
      static get tableName() {
        return "${tableName}";
      }
    }

    module.exports = ${modelName};`;
    return body;
  }

  static async [modelBodyWithMigration](modelName) {
    modelName = modelName.toLowerCase();
    try {
      shell.exec("npx knex migrate:make " + modelName);
      await BaseCommand.success(
        modelName +
          " migration successfully generated in Database/Migrations folder",
      );
      return await this[modelBody](modelName);
    } catch (error) {
      shell.exec("npm install knex -g");
      shell.exec("npx knex migrate:make " + modelName);
      await BaseCommand.success(
        modelName +
          " migration successfully generated in Database/Migrations folder",
      );
      return await this[modelBody](modelName);
    }
  }
}

module.exports = SqlProgram;
