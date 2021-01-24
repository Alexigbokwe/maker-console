"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const nextStep = Symbol("nextStep");
const generateJob = Symbol("generateJob");

class JobProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let checkFolder = BaseCommand.checkFolderExists("./App/Jobs");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Jobs/" + name + "_job.js",
      );
      if (doesFileExist == false) {
        await this[nextStep](name);
      } else {
        return BaseCommand.error(
          name + "_job.js already exist. Modify job name and try again",
        );
      }
    }
  }

  static async [nextStep](name) {
    fs.appendFile(
      "./App/Jobs/" + name + "_job.js",
      this[generateJob](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          name + "_job.js class successfully generated in App/Jobs folder",
        );
        return true;
      },
    );
  }

  static [generateJob](name) {
    let body = `"use strict";
        const ShouldQueue = require("../../Bootstrap/Queue/ShouldQueue");

        class ${name} extends ShouldQueue{
          constructor() {
            super();
            this.signature = "${name}_job";
            this.queueSignature(this.signature);
          }
          /**
           * Execute the job.
           * @return void
           */
          handle(data) {
            //
          }
        }

        module.exports = ${name};`;
    return body;
  }
}

module.exports = JobProgram;
