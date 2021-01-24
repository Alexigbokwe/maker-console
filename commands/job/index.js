"use strict";
const jobProgram = require("./program");

class JobCommand {
  static async handle(program) {
    await program
      .command("make-job [jobName]")
      .description("Create a new job class")
      .action((jobName) => {
        jobProgram.handle(jobName);
      });
  }
}

module.exports = JobCommand;
