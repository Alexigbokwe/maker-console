"use strict";
const Ora = require("ora");
const spinner = Ora("Processing: ");
const fs = require("fs");
const BaseCommand = require("../baseCommand");
const checkDatabaseDriver = Symbol("checkDatabaseDriver");
const createAuthRoute = Symbol("createAuthRoute");
const createModel = Symbol("createModel");
const nextStep = Symbol("nextStep");
const generateNoSqlModel = Symbol("generateNoSqlModel");
const generateSqlModel = Symbol("generateSqlModel");
const routeBody = Symbol("routeBody");
const appendRoute = Symbol("appendRoute");

class AuthProgram {
  static async handle() {
    let status = await this[createModel]();
    if (status != false) await this[createAuthRoute]();
  }

  static [checkDatabaseDriver]() {
    return process.env.DB_CONNECTION == "mongoose" ? "nosql" : "sql";
  }

  static async [createAuthRoute]() {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Generating Authentication route";
    let checkFolder = BaseCommand.checkFolderExists("./Routes/authRoute");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./Routes/authRoute/index.js",
      );
      if (doesFileExist == false) {
        await this[appendRoute]();
      } else {
        spinner.color = "red";
        spinner.text = "failed";
        spinner.fail("");
        return await BaseCommand.error(
          "Authentication routes already exist in App/Routes/authRoute folder.",
        );
      }
    }
  }

  static async [appendRoute]() {
    fs.appendFile(
      "./Routes/authRoute/index.js",
      this[routeBody](),
      function (err) {
        if (err) {
          spinner.color = "red";
          spinner.text = "failed";
          spinner.fail("");
          BaseCommand.error(err.errno);
          return false;
        } else {
          spinner.color = "green";
          spinner.text = "Completed";
          spinner.succeed("Completed 😊😘");
          BaseCommand.success(
            "Authentication route successfully generated in App/Routes/authRoute folder",
          );
          return true; 
        }
      },
    );
  }

  static [routeBody]() {
    let body = `
    "use strict";
    const Route = require("@routerManager");
    
    /*
    |--------------------------------------------------------------------------
    | Authentication Route File   
    |--------------------------------------------------------------------------
    |
    | This route handles both login and registration.
    | 
    */
    
    Route.post("/register", "Auth/RegisterController@register");
    
    Route.post("/login", "Auth/LoginController@login");
    
    module.exports = Route.exec;
    `;
    return body;
  }

  static async [createModel]() {
    spinner.start();
    spinner.color = "magenta";
    spinner.text = "Generating Authentication";
    let checkFolder = BaseCommand.checkFolderExists("./App/Model");
    if (checkFolder) {
      let doesFileExist = await BaseCommand.checkFileExists(
        "./App/Model/User_model.js",
      );
      if (doesFileExist == false) {
        return this[checkDatabaseDriver]() == "nosql"
          ? await this[nextStep](this[generateNoSqlModel]())
          : await this[nextStep](this[generateSqlModel]());
      } else {
        spinner.color = "red";
        spinner.text = "failed";
        spinner.fail("");
        await BaseCommand.error("User_model.js already exist.");
        return false;
      }
    }
  }

  static async [nextStep](generateModel) {
    fs.appendFile("./App/Model/User_model.js", generateModel, function (err) {
      if (err) {
        spinner.color = "red";
        spinner.text = "failed";
        spinner.fail("");
        BaseCommand.error(err.errno);
        return false;
      }
      spinner.color = "green";
      spinner.text = "Completed";
      spinner.succeed("Completed 😊😘");
      BaseCommand.success(
        "User_model.js class successfully generated in App/Model folder",
      );
      return true;
    });
  }

  static [generateNoSqlModel]() {
    let body = `"use strict";
    let mongoose = require("mongoose");
    let Schema = mongoose.Schema;
    let uniqueValidator = require("mongoose-unique-validator");

    let UserSchema = new Schema({
      //define the shape of your document within the collection.
      _id: mongoose.Schema.Types.ObjectId,
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
    })

    UserSchema.set("timestamps", true);
    UserSchema.plugin(uniqueValidator);

    module.exports = mongoose.model("User",UserSchema);
    `;
    return body;
  }

  static [generateSqlModel]() {
    let body = `"use strict";
    const Model = require("@elucidate/Model");

    class User extends Model {
      static get tableName() {
        return "users";
      }
    }
    
    module.exports = User;`;
    return body;
  }
}

module.exports = AuthProgram;
