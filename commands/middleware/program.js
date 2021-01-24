"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const nextStep = Symbol("nextStep");
const generateMiddleware = Symbol("generateMiddleware");

class MiddlewareProgram {
  static async handle(name) {
    name = name[0].toUpperCase() + name.slice(1);
    let checkFolder = BaseCommand.checkFolderExists("./App/Http/Middleware");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Http/Middleware/" + name + "_middleware.js",
      );
      if (doesFileExist == false) {
        await this[nextStep](name);
      } else {
        return BaseCommand.error(
          name +
            "_middleware.js already exist. Modify middleware name and try again",
        );
      }
    }
  }

  static async [nextStep](name) {
    fs.appendFile(
      "./App/Http/Middleware/" + name + "_middleware.js",
      this[generateMiddleware](name),
      function (err) {
        if (err) return BaseCommand.error(err.errno);
        BaseCommand.success(
          name +
            "_middleware.js class successfully generated in App/Http/Middleware folder",
        );
        return true;
      },
    );
  }

  static [generateMiddleware](name) {
    let body = `"use strict";

        class ${name} {
          /**
           * Handle Middleware.
           * @param {Request} req
           * @param {Response} res
           * @param {Next} next
           */
          async handle(req, res, next) {
            //UpStream
            await next();
            //DownStream
          }
        }

        module.exports = ${name};`;
    return body;
  }
}

module.exports = MiddlewareProgram;
