"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const nextStep = Symbol("nextStep");
const generateCommand = Symbol("generateCommand");

class ConsoleProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let checkFolder = BaseCommand.checkFolderExists("./App/Console/Commands");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Console/Commands/" + name + "_command.js",
      );
      if (doesFileExist == false) {
        await this[nextStep](name);
      } else {
        return BaseCommand.error(
          name + "_command.js already exist. Modify command name and try again",
        );
      }
    }
  }

  static async [nextStep](name) {
    fs.appendFile(
      "./App/Console/Commands/" + name + "_command.js",
      this[generateCommand](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          name +
            "_command.js class successfully generated in App/Console/Commands folder",
        );
        return true;
      },
    );
  }

  static [generateCommand](name) {
    let body = `"use strict";
    const Command = require("maker-console");

    class ${name} extends Command {
      constructor() {
        super();
        /**
         * The name and signature of the console command.
         * @var string
         */
        this.signature = "";
    
        /**
         * The name and mode of the console command argument.
         * name is the name of the argument while mode can be REQUIRED or OPTIONAL
         * Example [{name: "Debug", mode: "REQUIRED"},{name: "Task", mode: "REQUIRED"}]
         * @var array
         */
        this.arguments = [];
    
        /**
         * The console command description.
         * @var string
         */
        this.description = "";
    
        super.checkCommandName(this.signature);
      }
    
      /**
       * Execute the console command.
       *
       * @return mixed
       */
      fire() {
        //
      }
    }
    
    module.exports = ${name};`;
    return body;
  }
}

module.exports = ConsoleProgram;
