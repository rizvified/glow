const Machine = require("./machine");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ machines: [] }).write();

function Facility() {
  const generateTemp = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const generateId = () => {
    const randomId = Math.floor(100000 + Math.random() * 900000);
    return `IDX${randomId}`;
  };

  const randomMachine = (machineList) => {
    const machine = machineList[Math.floor(Math.random() * machineList.length)];
    return machine;
  };

  const updateMachines = () => {
    const allMachines = db.read().get("machines").value();
    if (allMachines.length === 0) return;
    const machine = randomMachine(allMachines);
    const units = machine.units;
    const newUnit = units + (Math.floor(Math.random() * 10) + 1);
    const newTemp = generateTemp();
    const newCount = machine.counter + 1;

    db.read()
      .get("machines")
      .find({ id: machine.id })
      .assign({ units: newUnit, temperature: newTemp, counter: newCount })
      .write();
    return machine.id;
  };

  const getMachines = () => {
    const machines = db.read().get("machines").map("id").value();
    let response = null;
    if (machines.length > 0) {
      response = machines.toString();
    } else {
      response = "No machines found";
    }

    return response;
  };

  const createMachine = (name) => {
    const newId = generateId();
    const machine = Machine(name.toUpperCase(), newId);
    db.read().get("machines").push(machine).write();
    return newId;
  };

  const trackMachine = (id) => {
    const machine = db.read().get("machines").find({ id }).value();
    let response = null;
    if (machine) {
      response = machine.units;
    } else {
      response = "No machine found";
    }
    return response;
  };

  const machineTemperature = (id) => {
    const machine = db.read().get("machines").find({ id }).value();
    let response = null;
    if (machine) {
      response = machine.temperature;
    } else {
      response = "No machine found";
    }
    return response;
  };

  const totalUnits = () => {
    const machineList = db.read().get("machines").map("units").value();
    let response = "No machines found";
    if (machineList.length > 0) {
      response = machineList.reduce((a, b) => a + b, 0);
    }
    return response;
  };

  const averageUnits = (id) => {
    const machine = db.read().get("machines").find({ id }).value();
    let response = "No units found";
    if (machine) {
      const units = machine.units;
      const counter = machine.counter;
      if (units > 0) {
        response = Math.round(units / counter);
      }
    } else {
      response = "No machine found";
    }
    return response;
  };

  const resetValues = () => {
    db.set("machines", []).write();
  };

  return {
    getMachines,
    createMachine,
    updateMachines,
    trackMachine,
    machineTemperature,
    totalUnits,
    averageUnits,
    resetValues,
  };
}

module.exports = Facility();
