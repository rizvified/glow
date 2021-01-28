#!/usr/bin/env node

const Facility = require("./lib/facility");

setInterval(function () {
  Facility.updateMachines();
}, 2000);
