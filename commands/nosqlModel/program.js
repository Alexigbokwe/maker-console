"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const nextStep = Symbol("nextStep");
const generateModel = Symbol("generateModel");

class NoSqlProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let checkFolder = BaseCommand.checkFolderExists("./App/Model");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Model/" + name + "_model.js",
      );
      if (doesFileExist == false) {
        await this[nextStep](name);
      } else {
        return BaseCommand.error(
          name + "_model.js already exist. Modify model name and try again",
        );
      }
    }
  }

  static async [nextStep](name) {
    fs.appendFile(
      "./App/Model/" + name + "_model.js",
      this[generateModel](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          name + "_model.js class successfully generated in App/Model folder",
        );
        return true;
      },
    );
  }

  static [generateModel](name) {
    let body = `"use strict";
    let mongoose = require("mongoose");
    let Schema = mongoose.Schema;

    let ${name}Schema = new Schema({
      //define the shape of your document within the collection.
      _id: mongoose.Schema.Types.ObjectId,
    })

    ${name}Schema.set("timestamps", true);

    module.exports = mongoose.model("${name}",${name}Schema);
    `;
    return body;
  }
}

module.exports = NoSqlProgram;
