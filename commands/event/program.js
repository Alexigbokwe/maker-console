"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const nextStep = Symbol("nextStep");
const generateEvent = Symbol("generateEvent");

class EventProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let checkFolder = BaseCommand.checkFolderExists("./App/Events");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Events/" + name + "_event.js",
      );
      if (doesFileExist == false) {
        await this[nextStep](name);
      } else {
        return BaseCommand.error(
          name + "_event.js already exist. Modify event name and try again",
        );
      }
    } 
  }

  static async [nextStep](name) {
    fs.appendFile(
      "./App/Events/" + name + "_event.js",
      this[generateEvent](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          name + "_event.js class successfully generated in App/Events folder",
        );
        return true;
      },
    );
  }

  static [generateEvent](name) {
    let body = `"use strict";
        let emitter = require("@emitter");

        class ${name} {
          /**
           * Create a new event instance.
           * @param {*} params
           */
          constructor(params) {
            this.params = params;
            this.listenOn();
            emitter.emit("${name}");
          }

          /**
           * Get the listener to listen to the event.
           */
          async listenOn() {
            //
          }
        }

        module.exports = ${name};`;
    return body;
  }
}

module.exports = EventProgram;
