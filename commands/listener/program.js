"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const nextStep = Symbol("nextStep");
const generateListener = Symbol("generateListener");

class ListenerProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let checkFolder = BaseCommand.checkFolderExists("./App/Listeners");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Listeners/" + name + "_listener.js",
      );
      if (doesFileExist == false) {
        await this[nextStep](name);
      } else { 
        return BaseCommand.error(
          name +
            "_listener.js already exist. Modify listener name and try again",
        );
      }
    }
  }

  static async [nextStep](name) {
    fs.appendFile(
      "./App/Listeners/" + name + "_listener.js",
      this[generateListener](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          name +
            "_listener.js class successfully generated in App/Listeners folder",
        );
        return true;
      },
    );
  }

  static [generateListener](name) {
    let body = `"use strict";
        let emitter = require("@emitter");

        class ${name} {
          /**
           * Handle the event.
           * @param {*} eventName
           * @param {*} params
           */
          constructor(eventName, params) {
            emitter.on(eventName, () => {
              //Do something
            });
          }
        }

        module.exports = ${name};`;
    return body;
  }
}

module.exports = ListenerProgram;
