"use strict";
const pathTo = process.env.PWD;
const BaseCommand = require("../baseCommand");

class ScheduledProgram {
  static async handle() {
    let path = `${pathTo}/App/Console/kernel.js`;
    let kernel = require(path);
    try {
      BaseCommand.success("Running scheduled command");
      kernel.schedule();
    } catch (error) {
      BaseCommand.error(error);
    }
  }
}

module.exports = ScheduledProgram;
