#!/usr/bin/env node

const program = require("commander");

const facility = require("./lib/facility");
const { launchProcess, terminateProcess } = require("./helpers");

const Facility = facility;

program
  .version("1.0.0")
  .name("glow")
  .description("A facility manager application")
  .option("-l, --list", "List all machines")
  .option("-c, --create <machine>", "Create a machine")
  .option("-t, --track <id>", "Display units produced by a machine")
  .option("-temp, --temperature <id>", "Display a machine's temperature")
  .option("-to, --total", "Display total units produced")
  .option(
    "-avg, --average <id>",
    "Display average units produced by the machine"
  )
  .option("-e, --exit", "Exit the program")
  .parse(process.argv);

function main() {
  const options = program.opts();
  const command = Object.keys(options)[0];
  if (command !== "exit") {
    launchProcess("worker.js");
  }

  switch (command) {
    case "list": {
      const machineList = Facility.getMachines();
      console.log(machineList);
      break;
    }
    case "create": {
      const machineName = options.create.toUpperCase();
      const machineId = Facility.createMachine(machineName);
      console.log(machineId);
      break;
    }
    case "track":
      const unit = Facility.trackMachine(options.track);
      console.log(unit);
      break;
    case "temperature":
      const temperature = Facility.machineTemperature(options.temperature);
      console.log(temperature);
      break;
    case "total":
      const total = Facility.totalUnits();
      console.log(total);
      break;
    case "average":
      const average = Facility.averageUnits(options.average);
      console.log(average);
      break;
    case "exit":
      terminateProcess("worker.js");
      Facility.resetValues();
      break;
    default:
      program.help();
      break;
  }
}

main();
