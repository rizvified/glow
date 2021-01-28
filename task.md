# Technical assignment:

This technical assignment aims to assess you ability to solve technical problems, to design software, and to write code. Please do not use any external libraries except to build the project and run the unit tests.

## Challenge:

Develop a command line application to monitor the status of a manufacturing facility by tracking all the system events emitted by all the machines. The application should allow the following command line actions:

- Create a machine; A machine has a name and a unique Id
- Track how many units are produced by each machine
- Track machines temperature
- Show total produced units
- Show average produced units by machine

### Examples (command line actions):

- create MACHINE1 IDX123456
- track IDX123456 12
- track IDX123456 40
- temperature IDX123456 120
- temperature IDX123456 Should output 120
- total IDX123456 Should output 52
- average IDX123456 Should output 26
