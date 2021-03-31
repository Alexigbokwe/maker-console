"use strict";
const controllerBody = Symbol("controllerBody");
const controllerBodyWithResource = Symbol("controllerBodyWithResource");
const createController = Symbol("withResource");
const fs = require("fs");
const BaseCommand = require("../baseCommand");

class ControllerProgram {
  static async handle(name, resource = null) {
    name = name[0].toUpperCase() + name.slice(1);
    let check = await BaseCommand.checkFileExists(
      "./App/Http/Controller/" + name + ".js",
    );
    if (check == false) {
      await this[createController](name, resource);
    } else {
      return BaseCommand.error("Controller class already exists");
    }
  }

  static async [createController](controllerName, resource = null) {
    if (resource == "Controller Resource Methods") {
      fs.appendFile(
        "./App/Http/Controller/" + controllerName + ".js",
        await this[controllerBodyWithResource](controllerName),
        function (err) {
          if (err) BaseCommand.error(err);
          BaseCommand.success(
            controllerName +
              " class successfully generated in App/Http/Controller folder",
          );
        },
      );
    } else {
      fs.appendFile(
        "./App/Http/Controller/" + controllerName + ".js",
        await this[controllerBody](controllerName),
        function (err) {
          if (err) BaseCommand.error(err);
          BaseCommand.success(
            controllerName +
              " class successfully generated in App/Http/Controller folder",
          );
        },
      );
    }
  }

  static async [controllerBody](controllerName) {
    let body = `"use strict";
    const Response = require("../../Utils/HttpResponse");

        class ${controllerName}{
          //
        }

        module.exports = ${controllerName};
        `;
    return body;
  }

  static async [controllerBodyWithResource](controllerName) {
    let body =
      `"use strict";
      const Response = require("../../Utils/HttpResponse");

        class ` +
      controllerName +
      `{
          /**
           * Display a listing of the resource.
           */
          index = async (req, res, next) =>{
            try{
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Show the form for creating a new resource.
           *
           * @return Response
           */
          create = async (req, res, next) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Store a newly created resource in storage.
           * @param  Request 
           * @return Response
           */
          store = async (req, res, next) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Display the specified resource.
           * @param  Request
           * @return Response
           */
          show = async (req, res, next) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Show the form for editing the specified resource.
           * @param  Request
           * @return Response
           */
          edit = async (req, res, next) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Update the specified resource in storage.
           * @param  Request
           * @return Response
           */
          update = async (req, res, next) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }

          /**
           * Remove the specified resource from storage.
           *
           * @param Request
           * @return Response
           */
          destroy = async (req, res, next) => {
            try{
              //
            }catch (error) {
              return next(error);
            }
          }
        }

        module.exports = ` +
      controllerName +
      `;
        `;
    return body;
  }
}

module.exports = ControllerProgram;
