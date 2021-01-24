"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const nextStep = Symbol("nextStep");
const generateRequest = Symbol("generateRequest");

class RequestProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let checkFolder = BaseCommand.checkFolderExists("./App/Http/Requests");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Http/Requests/" + name + "_request.js",
      );
      if (doesFileExist == false) {
        await this[nextStep](name);
      } else {
        return BaseCommand.error(
          name +
            "_request.js already exist. Modify request validator name and try again",
        );
      }
    }
  }

  static async [nextStep](name) {
    fs.appendFile(
      "./App/Http/Requests/" + name + "_request.js",
      this[generateRequest](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          name +
            "_request.js class successfully generated in App/Http/Requests folder",
        );
        return true;
      },
    );
  }

  static [generateRequest](name) {
    let body = `"use strict";
        const FormRequest = require("@elucidate/formRequest");

        class ${name} extends FormRequest{
          /**
           * Handle the request validation.
           * @param {*} data | e.g request body
           */
          async validate(data) {
            return await this.make(data, {
              //Validation rules
            });
          }
        }

        module.exports = new ${name}();`;
    return body;
  }
}

module.exports = RequestProgram;
