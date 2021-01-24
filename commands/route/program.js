"use strict";
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const shell = require("shelljs");
const nextStep = Symbol("nextStep");
const routeFolder = Symbol("routeFolder");
const routeBody = Symbol("routeBody");
const Ora = require("ora");
const spinner = Ora("Processing: ");

class RouteProgram {
  static async handle(name) {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Generating Route";
    name = name[0].toUpperCase() + name.slice(1);
    let doesFileExist = await BaseCommand.checkFileExists(
      `./Routes/${name}/index.js`,
    );
    if (doesFileExist == false) {
      await this[nextStep](name);
      spinner.color = "green";
      spinner.text = "Completed";
      spinner.succeed("Completed 😊😘");
    } else {
      spinner.color = "red";
      spinner.text = "failed";
      spinner.fail("");
      return BaseCommand.error(
        name + " route folder already exist. Modify route name and try again",
      );
    }
  }

  static async [nextStep](name) {
    await this[routeFolder](name);
    shell.mv("./output.txt", "./App/Providers/Route.js");
  }

  static async [routeFolder](name) {
    shell.mkdir("./Routes/" + name);
    fs.appendFile(
      "./Routes/" + name + "/index.js",
      await this[routeBody](name),
      function (err) {
        if (err) throw err;
        BaseCommand.success(
          `${name} route successfully generated in Routes/${name}`,
        );
      },
    );
  }

  static async [routeBody](name) {
    let body = `"use strict";
      const Route = require("@routerManager");
       
      /*
      |--------------------------------------------------------------------------
      | ${name} Route File   
      |--------------------------------------------------------------------------
      |
      | Example of closure route 
      | 
      | Route.get("/",(req,res)=>{}); 
      |
      | Example of controller route.
      |
      | Route.get("/","UserController@index);
      | 
      */

      Route.group("/${name}", () => {
        //
      });
        

      module.exports = Route.exec;
    `;
    return body;
  }
}

module.exports = RouteProgram;
