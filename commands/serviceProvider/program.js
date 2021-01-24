"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const nextStep = Symbol("nextStep");
const generateService = Symbol("generateService");

class ProviderProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let checkFolder = BaseCommand.checkFolderExists("./App/Providers");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Providers/" + name + ".js",
      );
      if (doesFileExist == false) {
        await this[nextStep](name);
      } else {
        return BaseCommand.error(
          name +
            ".js already exist. Modify service provider name and try again",
        );
      }
    }
  }

  static async [nextStep](name) {
    fs.appendFile(
      "./App/Providers/" + name + ".js",
      this[generateService](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          name + ".js class successfully generated in App/Providers folder",
        );
        return true;
      },
    );
  }

  static [generateService](name) {
    let body = `"use strict";
    const ioc = require("expressweb-ioc");
    
    class ${name}{
        /**
         * Register application services.
        */
        register() {
            return {
            //
            };
        }

        /**
         * Bootstrap any application services.
         *
         * @return void
        */
        boot() {
           //
        }
    }

    module.exports = ${name};`;
    return body;
  }
}

module.exports = ProviderProgram;
